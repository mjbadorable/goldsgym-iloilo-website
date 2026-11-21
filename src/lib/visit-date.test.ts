import { test } from "node:test";
import assert from "node:assert/strict";
import {
  addDays,
  compareDates,
  compareMonths,
  dayOfWeek,
  daysInMonth,
  firstWeekday,
  formatCalendarDate,
  hoursForDate,
  manilaToday,
  stepMonth,
  visitHoursNote,
} from "./visit-date.ts";

// 2026-11-23 is a Monday. Times are Manila (UTC+8).
const manila = (iso: string) => new Date(`${iso}:00+08:00`);
const d = (year: number, month: number, day: number) => ({ year, month, day });

test("manilaToday follows Manila, not the machine time zone", () => {
  // 22:00 UTC on 22 Nov is already 06:00 on 23 Nov in Manila.
  assert.deepEqual(manilaToday(new Date("2026-11-22T22:00:00Z")), d(2026, 10, 23));
  assert.deepEqual(manilaToday(new Date("2026-11-22T15:59:00Z")), d(2026, 10, 22));
});

test("manilaToday rolls the year over at Manila midnight", () => {
  assert.deepEqual(manilaToday(new Date("2026-12-31T15:59:00Z")), d(2026, 11, 31));
  assert.deepEqual(manilaToday(new Date("2026-12-31T16:00:00Z")), d(2027, 0, 1));
});

test("addDays crosses month, year and leap-day boundaries", () => {
  assert.deepEqual(addDays(d(2026, 11, 31), 1), d(2027, 0, 1));
  assert.deepEqual(addDays(d(2026, 10, 30), 1), d(2026, 11, 1));
  assert.deepEqual(addDays(d(2028, 1, 28), 1), d(2028, 1, 29));
  assert.deepEqual(addDays(d(2027, 1, 28), 1), d(2027, 2, 1));
  assert.deepEqual(addDays(d(2026, 0, 1), -1), d(2025, 11, 31));
});

test("compareDates and compareMonths order chronologically", () => {
  assert.ok(compareDates(d(2026, 10, 22), d(2026, 10, 23)) < 0);
  assert.ok(compareDates(d(2027, 0, 1), d(2026, 11, 31)) > 0);
  assert.equal(compareDates(d(2026, 10, 23), d(2026, 10, 23)), 0);
  assert.ok(compareMonths({ year: 2026, month: 11 }, { year: 2027, month: 0 }) < 0);
  assert.equal(compareMonths({ year: 2026, month: 3 }, { year: 2026, month: 3 }), 0);
});

test("dayOfWeek: 23 Nov 2026 is a Monday, 22 Nov a Sunday", () => {
  assert.equal(dayOfWeek(d(2026, 10, 23)), 1);
  assert.equal(dayOfWeek(d(2026, 10, 22)), 0);
});

test("month grid helpers", () => {
  assert.equal(daysInMonth({ year: 2026, month: 10 }), 30);
  assert.equal(daysInMonth({ year: 2028, month: 1 }), 29);
  assert.equal(daysInMonth({ year: 2027, month: 1 }), 28);
  // 1 Nov 2026 is a Sunday, so no blank cells before day 1.
  assert.equal(firstWeekday({ year: 2026, month: 10 }), 0);
  // 1 Dec 2026 is a Tuesday.
  assert.equal(firstWeekday({ year: 2026, month: 11 }), 2);
});

test("stepMonth wraps the year in both directions", () => {
  assert.deepEqual(stepMonth({ year: 2026, month: 11 }, 1), { year: 2027, month: 0 });
  assert.deepEqual(stepMonth({ year: 2027, month: 0 }, -1), { year: 2026, month: 11 });
  assert.deepEqual(stepMonth({ year: 2026, month: 10 }, 14), { year: 2028, month: 0 });
});

test("formatCalendarDate", () => {
  assert.equal(formatCalendarDate(d(2026, 10, 23)), "Mon, Nov 23, 2026");
  assert.equal(formatCalendarDate(d(2027, 0, 1)), "Fri, Jan 1, 2027");
});

test("hoursForDate gives weekday and weekend hours", () => {
  assert.equal(hoursForDate(d(2026, 10, 23)), "6:00 AM – 10:00 PM"); // Monday
  assert.equal(hoursForDate(d(2026, 10, 27)), "6:00 AM – 10:00 PM"); // Friday
  assert.equal(hoursForDate(d(2026, 10, 28)), "8:00 AM – 8:00 PM"); // Saturday
  assert.equal(hoursForDate(d(2026, 10, 29)), "8:00 AM – 8:00 PM"); // Sunday
});

test("visitHoursNote shows normal hours while the gym is still open today", () => {
  assert.equal(visitHoursNote(d(2026, 10, 23), manila("2026-11-23T21:59")), "Open 6:00 AM – 10:00 PM");
});

test("visitHoursNote says closed once today's closing time has passed", () => {
  assert.equal(
    visitHoursNote(d(2026, 10, 23), manila("2026-11-23T22:00")),
    "Closed for today. Opens tomorrow 6:00 AM",
  );
  // Friday night: tomorrow is Saturday, which opens at 8.
  assert.equal(
    visitHoursNote(d(2026, 10, 27), manila("2026-11-27T22:30")),
    "Closed for today. Opens tomorrow 8:00 AM",
  );
  // Saturday closes at 8 PM.
  assert.equal(
    visitHoursNote(d(2026, 10, 28), manila("2026-11-28T20:00")),
    "Closed for today. Opens tomorrow 8:00 AM",
  );
});

test("visitHoursNote never warns about a day that is not today", () => {
  // Late Monday night, but the visitor picked Tuesday.
  assert.equal(visitHoursNote(d(2026, 10, 24), manila("2026-11-23T23:00")), "Open 6:00 AM – 10:00 PM");
});
