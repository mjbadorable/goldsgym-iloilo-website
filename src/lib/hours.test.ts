import { test } from "node:test";
import assert from "node:assert/strict";
import { getHoursStatus, formatMinutes, manilaClock } from "./hours.ts";

// 2026-11-23 is a Monday. Times are written in Manila (UTC+8) so the tests read like the gym's clock.
const manila = (iso: string) => new Date(`${iso}:00+08:00`);

test("formatMinutes renders 12-hour times", () => {
  assert.equal(formatMinutes(6 * 60), "6:00 AM");
  assert.equal(formatMinutes(22 * 60), "10:00 PM");
  assert.equal(formatMinutes(12 * 60), "12:00 PM");
  assert.equal(formatMinutes(0), "12:00 AM");
});

test("manilaClock ignores the machine time zone", () => {
  // 22:00 UTC on Sunday is 06:00 Monday in Manila.
  assert.deepEqual(manilaClock(new Date("2026-11-22T22:00:00Z")), { day: 1, minutes: 360 });
});

test("Monday 06:00 opens the gym", () => {
  const s = getHoursStatus(manila("2026-11-23T06:00"));
  assert.equal(s.isOpen, true);
  assert.equal(s.detail, "Closes 10:00 PM");
});

test("Monday 05:59 is still closed and opens today", () => {
  const s = getHoursStatus(manila("2026-11-23T05:59"));
  assert.equal(s.isOpen, false);
  assert.equal(s.detail, "Opens today 6:00 AM");
});

test("Friday 22:00 is closed; Saturday opens later at 8:00 AM", () => {
  const s = getHoursStatus(manila("2026-11-27T22:00"));
  assert.equal(s.isOpen, false);
  assert.equal(s.detail, "Opens tomorrow 8:00 AM");
});

test("Saturday 19:59 is open, 20:00 is closed", () => {
  assert.equal(getHoursStatus(manila("2026-11-28T19:59")).isOpen, true);
  assert.equal(getHoursStatus(manila("2026-11-28T20:00")).isOpen, false);
});

test("Sunday after closing opens Monday at 6:00 AM", () => {
  const s = getHoursStatus(manila("2026-11-29T20:30"));
  assert.equal(s.isOpen, false);
  assert.equal(s.detail, "Opens tomorrow 6:00 AM");
});

test("Sunday 09:00 is open with weekend hours", () => {
  const s = getHoursStatus(manila("2026-11-29T09:00"));
  assert.equal(s.isOpen, true);
  assert.equal(s.detail, "Closes 8:00 PM");
});
