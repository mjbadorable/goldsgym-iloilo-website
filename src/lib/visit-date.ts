// Date helpers for the day-pass calendar. Pure functions with no React, so they can be unit-tested
// with `npm test`. Every "today" is the gym's today (Asia/Manila), not the visitor's device date.
import { TIME_ZONE, formatMinutes, manilaClock, rangeFor } from "./hours.ts";

export type CalendarDate = {
  year: number;
  /** 0-indexed, like Date. */
  month: number;
  day: number;
};

export type CalendarMonth = Pick<CalendarDate, "year" | "month">;

export const MONTHS = [
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
export const SHORT_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
export const SHORT_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const;

/** The calendar date it is in Manila at `now`. */
export function manilaToday(now: Date): CalendarDate {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).formatToParts(now);
  const num = (t: string) => Number(parts.find((p) => p.type === t)?.value ?? 0);
  return { year: num("year"), month: num("month") - 1, day: num("day") };
}

export function addDays(d: CalendarDate, delta: number): CalendarDate {
  const dt = new Date(Date.UTC(d.year, d.month, d.day + delta));
  return { year: dt.getUTCFullYear(), month: dt.getUTCMonth(), day: dt.getUTCDate() };
}

/** Negative when `a` is before `b`, zero when equal, positive when after. */
export function compareDates(a: CalendarDate, b: CalendarDate): number {
  if (a.year !== b.year) return a.year - b.year;
  if (a.month !== b.month) return a.month - b.month;
  return a.day - b.day;
}

export function compareMonths(a: CalendarMonth, b: CalendarMonth): number {
  return a.year !== b.year ? a.year - b.year : a.month - b.month;
}

/** 0 = Sunday … 6 = Saturday. */
export function dayOfWeek(d: CalendarDate): number {
  return new Date(Date.UTC(d.year, d.month, d.day)).getUTCDay();
}

export function daysInMonth(m: CalendarMonth): number {
  return new Date(Date.UTC(m.year, m.month + 1, 0)).getUTCDate();
}

/** Weekday (0 = Sunday) the 1st of the month falls on: the number of blank cells before day 1. */
export function firstWeekday(m: CalendarMonth): number {
  return new Date(Date.UTC(m.year, m.month, 1)).getUTCDay();
}

export function stepMonth(m: CalendarMonth, delta: number): CalendarMonth {
  const dt = new Date(Date.UTC(m.year, m.month + delta, 1));
  return { year: dt.getUTCFullYear(), month: dt.getUTCMonth() };
}

/** "Mon, Nov 23, 2026" */
export function formatCalendarDate(d: CalendarDate): string {
  return `${SHORT_DAYS[dayOfWeek(d)]}, ${SHORT_MONTHS[d.month]} ${d.day}, ${d.year}`;
}

/** Opening range for that weekday, e.g. "6:00 AM – 10:00 PM". */
export function hoursForDate(d: CalendarDate): string {
  const range = rangeFor(dayOfWeek(d));
  return `${formatMinutes(range.open)} – ${formatMinutes(range.close)}`;
}

/**
 * One line telling the visitor when the gym is open on `d`. If `d` is today and the gym has already
 * closed, it says so instead of offering hours that are over.
 */
export function visitHoursNote(d: CalendarDate, now: Date): string {
  const today = manilaToday(now);
  const dow = dayOfWeek(d);
  const range = rangeFor(dow);
  if (compareDates(d, today) === 0 && manilaClock(now).minutes >= range.close) {
    const next = rangeFor((dow + 1) % 7);
    return `Closed for today. Opens tomorrow ${formatMinutes(next.open)}`;
  }
  return `Open ${formatMinutes(range.open)} – ${formatMinutes(range.close)}`;
}
