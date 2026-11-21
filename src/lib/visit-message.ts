// Builds the prefilled day-pass message and the sms: / mailto: links that carry it. The site stores
// and sends nothing; these strings are all that leaves the page, and only when the visitor taps send.
import { formatCalendarDate, type CalendarDate } from "./visit-date.ts";

export const MAX_NAME_LENGTH = 60;

export function buildVisitMessage({
  siteName,
  name,
  date,
}: {
  siteName: string;
  name: string;
  date: CalendarDate | null;
}): string {
  const cleanName = name.trim().slice(0, MAX_NAME_LENGTH);
  return [
    `Hi ${siteName}, I'd like to claim a free day pass.`,
    cleanName ? `Name: ${cleanName}` : null,
    date ? `Preferred date: ${formatCalendarDate(date)}` : null,
  ]
    .filter((line): line is string => line !== null)
    .join("\n");
}

/** `?&body=` is deliberate: it is the form both iOS and Android Messages accept. */
export function smsHref(phoneE164: string, message: string): string {
  return `sms:${phoneE164}?&body=${encodeURIComponent(message)}`;
}

export function mailtoHref(email: string, subject: string, message: string): string {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
}
