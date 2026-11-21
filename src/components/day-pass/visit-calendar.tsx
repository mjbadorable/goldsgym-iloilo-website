"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Calendar } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { HOURS, formatMinutes } from "@/lib/hours";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] as const;
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;
const SHORT_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
const SHORT_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const;

export type CalendarDate = {
  year: number;
  month: number; // 0-indexed
  day: number;
};

function getManilaToday(): CalendarDate {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Manila",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).formatToParts(new Date());
  const num = (t: string) => Number(parts.find((p) => p.type === t)?.value ?? 0);
  return { year: num("year"), month: num("month") - 1, day: num("day") };
}

function addDays(d: CalendarDate, delta: number): CalendarDate {
  const dt = new Date(Date.UTC(d.year, d.month, d.day + delta));
  return { year: dt.getUTCFullYear(), month: dt.getUTCMonth(), day: dt.getUTCDate() };
}

function compareDates(a: CalendarDate, b: CalendarDate): number {
  if (a.year !== b.year) return a.year - b.year;
  if (a.month !== b.month) return a.month - b.month;
  return a.day - b.day;
}

function dayOfWeek(d: CalendarDate): number {
  return new Date(Date.UTC(d.year, d.month, d.day)).getUTCDay();
}

export function formatCalendarDate(d: CalendarDate): string {
  const dow = SHORT_DAYS[dayOfWeek(d)];
  return `${dow}, ${SHORT_MONTHS[d.month]} ${d.day}, ${d.year}`;
}

function hoursForDate(d: CalendarDate): string {
  const dow = dayOfWeek(d);
  const range = HOURS.find((r) => r.days.includes(dow)) ?? HOURS[0];
  return `${formatMinutes(range.open)} – ${formatMinutes(range.close)}`;
}

type VisitCalendarProps = {
  value: CalendarDate | null;
  onChange: (next: CalendarDate | null) => void;
};

/**
 * Interactive dark-and-gold calendar scoped to Asia/Manila time.
 * Reads the clock only after mount so Next.js static prerendering stays deterministic.
 */
export function VisitCalendar({ value, onChange }: VisitCalendarProps) {
  const [today, setToday] = useState<CalendarDate | null>(null);
  const [view, setView] = useState<{ year: number; month: number } | null>(null);

  useEffect(() => {
    const t = getManilaToday();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setToday(t);
    setView({ year: t.year, month: t.month });
  }, []);

  if (!today || !view) {
    return (
      <div className="border border-line-subtle bg-canvas p-4">
        <p className="font-mono text-[0.8125rem] text-muted">Loading calendar...</p>
      </div>
    );
  }

  const tomorrow = addDays(today, 1);
  const firstWeekday = new Date(Date.UTC(view.year, view.month, 1)).getUTCDay();
  const daysInMonth = new Date(Date.UTC(view.year, view.month + 1, 0)).getUTCDate();
  const canGoPrev = view.year > today.year || view.month > today.month;

  function stepMonth(delta: number) {
    if (!view) return;
    const dt = new Date(Date.UTC(view.year, view.month + delta, 1));
    setView({ year: dt.getUTCFullYear(), month: dt.getUTCMonth() });
  }

  function pickQuick(d: CalendarDate) {
    onChange(d);
    setView({ year: d.year, month: d.month });
  }

  const cells: Array<CalendarDate | null> = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => ({
      year: view.year,
      month: view.month,
      day: i + 1,
    })),
  ];

  const isSelected = (d: CalendarDate) => value !== null && compareDates(value, d) === 0;
  const isToday = (d: CalendarDate) => compareDates(today, d) === 0;

  return (
    <div className="border border-line-subtle bg-canvas p-4">
      {/* Quick-pick chips */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => pickQuick(today)}
          className={cn(
            "h-8 border px-3 font-mono text-[0.75rem] transition-colors duration-[160ms]",
            isSelected(today)
              ? "border-gold bg-gold font-semibold text-gold-ink"
              : "border-line-subtle text-fg hover:border-gold hover:text-gold",
          )}
        >
          Today
        </button>
        <button
          type="button"
          onClick={() => pickQuick(tomorrow)}
          className={cn(
            "h-8 border px-3 font-mono text-[0.75rem] transition-colors duration-[160ms]",
            isSelected(tomorrow)
              ? "border-gold bg-gold font-semibold text-gold-ink"
              : "border-line-subtle text-fg hover:border-gold hover:text-gold",
          )}
        >
          Tomorrow
        </button>
        <button
          type="button"
          onClick={() => onChange(null)}
          className={cn(
            "ml-auto h-8 border px-3 font-mono text-[0.75rem] transition-colors duration-[160ms]",
            value === null
              ? "border-gold/60 bg-elevated text-gold"
              : "border-line-subtle text-muted hover:border-line hover:text-fg",
          )}
        >
          Not sure yet
        </button>
      </div>

      {/* Month header */}
      <div className="mt-4 flex items-center justify-between border-y border-line-subtle py-2.5">
        <button
          type="button"
          onClick={() => stepMonth(-1)}
          disabled={!canGoPrev}
          aria-label="Previous month"
          className="inline-flex size-8 items-center justify-center border border-line-subtle text-fg transition-colors duration-[160ms] hover:border-gold hover:text-gold disabled:opacity-30 disabled:hover:border-line-subtle disabled:hover:text-fg"
        >
          <ArrowLeft className="size-4" />
        </button>
        <p className="font-label text-[1.125rem] leading-none tracking-[0.08em] text-fg uppercase">
          {MONTHS[view.month]} {view.year}
        </p>
        <button
          type="button"
          onClick={() => stepMonth(1)}
          aria-label="Next month"
          className="inline-flex size-8 items-center justify-center border border-line-subtle text-fg transition-colors duration-[160ms] hover:border-gold hover:text-gold"
        >
          <ArrowRight className="size-4" />
        </button>
      </div>

      {/* Weekday headers */}
      <div className="mt-3 grid grid-cols-7 gap-1 text-center">
        {WEEKDAYS.map((w) => (
          <span key={w} className="py-1 font-mono text-[0.75rem] text-muted">
            {w}
          </span>
        ))}
      </div>

      {/* Day buttons */}
      <div className="mt-1 grid grid-cols-7 gap-1" role="grid" aria-label={`${MONTHS[view.month]} ${view.year}`}>
        {cells.map((cell, idx) => {
          if (!cell) return <span key={`empty-${idx}`} aria-hidden="true" />;
          const past = compareDates(cell, today) < 0;
          const selected = isSelected(cell);
          const current = isToday(cell);
          return (
            <button
              key={`${cell.year}-${cell.month}-${cell.day}`}
              type="button"
              disabled={past}
              aria-pressed={selected}
              aria-label={formatCalendarDate(cell)}
              onClick={() => onChange(cell)}
              className={cn(
                "flex h-9 w-full items-center justify-center border font-mono text-[0.8125rem] tabular-nums transition-all duration-[160ms] active:scale-[0.95]",
                selected
                  ? "border-gold bg-gold font-semibold text-gold-ink"
                  : past
                    ? "border-transparent text-muted/30"
                    : current
                      ? "border-gold/60 bg-elevated text-gold hover:border-gold"
                      : "border-transparent text-fg hover:border-line hover:bg-elevated",
              )}
            >
              {cell.day}
            </button>
          );
        })}
      </div>

      {/* Live selection & gym hours readout */}
      <div className="mt-4 flex items-center gap-2 border-t border-line-subtle pt-3 font-mono text-[0.75rem]">
        <Calendar className="size-4 shrink-0 text-gold" />
        {value ? (
          <p className="text-fg">
            <span className="text-gold">{formatCalendarDate(value)}</span>
            <span className="text-muted"> · Open {hoursForDate(value)}</span>
          </p>
        ) : (
          <p className="text-muted">Pick a date above, or leave flexible.</p>
        )}
      </div>
    </div>
  );
}
