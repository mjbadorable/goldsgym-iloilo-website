// Opening hours and the live Open/Closed status. Pure functions, no imports, so they can
// be unit-tested with `npm test` (node:test) and used from client components.
//
// The gym is in Iloilo, so all logic runs in Asia/Manila (UTC+8, no daylight saving)
// regardless of where the visitor's device is.

export const TIME_ZONE = "Asia/Manila";

export type DayRange = {
  /** Display label, e.g. "Mon–Fri". */
  label: string;
  /** Day indexes, 0 = Sunday … 6 = Saturday. */
  days: readonly number[];
  /** Minutes after midnight. */
  open: number;
  close: number;
};

export const HOURS: readonly DayRange[] = [
  { label: "Mon–Fri", days: [1, 2, 3, 4, 5], open: 6 * 60, close: 22 * 60 },
  { label: "Sat–Sun", days: [6, 0], open: 8 * 60, close: 20 * 60 },
];

export type HoursStatus = {
  isOpen: boolean;
  /** Short badge text: "Open now" / "Closed". */
  label: string;
  /** Supporting text: "Closes 10:00 PM" / "Opens tomorrow 6:00 AM". */
  detail: string;
};

export function formatMinutes(minutes: number): string {
  const h24 = Math.floor(minutes / 60);
  const m = minutes % 60;
  const suffix = h24 >= 12 ? "PM" : "AM";
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${suffix}`;
}

/** Day of week (0 = Sunday) and minutes after midnight, in Manila time. */
export function manilaClock(date: Date): { day: number; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(date);

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { day, minutes: Number(get("hour")) * 60 + Number(get("minute")) };
}

function rangeFor(day: number): DayRange {
  return HOURS.find((r) => r.days.includes(day)) ?? HOURS[0];
}

export function getHoursStatus(date: Date): HoursStatus {
  const { day, minutes } = manilaClock(date);
  const today = rangeFor(day);

  if (minutes >= today.open && minutes < today.close) {
    return { isOpen: true, label: "Open now", detail: `Closes ${formatMinutes(today.close)}` };
  }

  if (minutes < today.open) {
    return { isOpen: false, label: "Closed", detail: `Opens today ${formatMinutes(today.open)}` };
  }

  // Past closing time: the gym opens again tomorrow (every day of the week has hours).
  const next = rangeFor((day + 1) % 7);
  return { isOpen: false, label: "Closed", detail: `Opens tomorrow ${formatMinutes(next.open)}` };
}
