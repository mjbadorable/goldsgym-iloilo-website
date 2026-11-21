"use client";

import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Calendar } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { useNow } from "@/lib/use-manila-now";
import {
  MONTHS,
  addDays,
  compareDates,
  compareMonths,
  daysInMonth,
  firstWeekday,
  formatCalendarDate,
  manilaToday,
  stepMonth,
  visitHoursNote,
  type CalendarDate,
  type CalendarMonth,
} from "@/lib/visit-date";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] as const;

const chip =
  "h-8 border px-3 font-mono text-[0.75rem] transition-colors duration-[160ms]";

type VisitCalendarProps = {
  value: CalendarDate | null;
  onChange: (next: CalendarDate | null) => void;
};

/**
 * Interactive dark-and-gold calendar scoped to Asia/Manila time.
 * "Today" comes from a clock that only exists after hydration (so static prerendering stays
 * deterministic) and keeps ticking, so a tab left open past Manila midnight moves on by itself.
 */
export function VisitCalendar({ value, onChange }: VisitCalendarProps) {
  const now = useNow();
  // The month the visitor browsed to; null means "the current month".
  const [browsed, setBrowsed] = useState<CalendarMonth | null>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  if (!now) {
    return (
      <div className="border border-line-subtle bg-canvas p-4">
        <p className="font-mono text-[0.8125rem] text-muted">Loading calendar...</p>
      </div>
    );
  }

  const today = manilaToday(now);
  const tomorrow = addDays(today, 1);
  // Never show a month before the current one, even if midnight rolled into a new month meanwhile.
  const view = browsed && compareMonths(browsed, today) >= 0 ? browsed : { year: today.year, month: today.month };
  const canGoPrev = compareMonths(view, today) > 0;

  function goToMonth(delta: number) {
    const next = stepMonth(view, delta);
    setBrowsed(next);
    // The Previous button disables itself on the current month; don't leave focus on a dead control.
    if (compareMonths(next, today) <= 0) nextRef.current?.focus();
  }

  function pickQuick(d: CalendarDate) {
    onChange(d);
    setBrowsed({ year: d.year, month: d.month });
  }

  const cells: Array<CalendarDate | null> = [
    ...Array.from({ length: firstWeekday(view) }, () => null),
    ...Array.from({ length: daysInMonth(view) }, (_, i) => ({
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
        {[
          { label: "Today", date: today },
          { label: "Tomorrow", date: tomorrow },
        ].map(({ label, date }) => {
          const selected = isSelected(date);
          return (
            <button
              key={label}
              type="button"
              aria-pressed={selected}
              onClick={() => pickQuick(date)}
              className={cn(
                chip,
                selected
                  ? "border-gold bg-gold font-semibold text-gold-ink"
                  : "border-line-subtle text-fg hover:border-gold hover:text-gold",
              )}
            >
              {label}
            </button>
          );
        })}
        <button
          type="button"
          aria-pressed={value === null}
          onClick={() => onChange(null)}
          className={cn(
            chip,
            "ml-auto",
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
          onClick={() => goToMonth(-1)}
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
          ref={nextRef}
          type="button"
          onClick={() => goToMonth(1)}
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
      <div className="mt-1 grid grid-cols-7 gap-1" role="group" aria-label={`${MONTHS[view.month]} ${view.year}`}>
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
          <p className="flex flex-wrap gap-x-3 text-fg">
            <span className="text-gold">{formatCalendarDate(value)}</span>
            <span className="text-muted">{visitHoursNote(value, now)}</span>
          </p>
        ) : (
          <p className="text-muted">Pick a date above, or leave flexible.</p>
        )}
      </div>
    </div>
  );
}
