"use client";

import { useEffect, useRef, useState } from "react";
import { OpenBadge } from "@/components/hours/open-badge";
import { buttonClasses } from "@/components/ui/button";
import { ArrowUpRight, Check, Close, Copy, Mail, MessageSquare, Phone } from "@/components/ui/icons";
import { Sheet } from "@/components/ui/sheet";
import { StickyBar, StickySections } from "@/components/ui/sticky-sections";
import { CONTACT, SITE } from "@/lib/site";
import { useNow } from "@/lib/use-manila-now";
import { compareDates, manilaToday, type CalendarDate } from "@/lib/visit-date";
import {
  MAX_NAME_LENGTH,
  buildVisitMessage,
  gmailComposeHref,
  mailtoHref,
  smsHref,
} from "@/lib/visit-message";
import { useDayPass } from "./day-pass-provider";
import { VisitCalendar } from "./visit-calendar";

const field =
  "h-12 w-full border border-line-subtle bg-canvas px-4 text-fg transition-colors duration-[160ms] " +
  "placeholder:text-muted hover:border-line focus:border-gold focus:outline-none " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

const EMAIL_SUBJECT = "Gym visit inquiry";
const copyButton =
  "inline-flex h-10 items-center gap-2 border border-line-subtle px-4 font-mono text-[0.8125rem] text-fg transition-colors duration-[160ms] hover:border-gold hover:text-gold";

type CopyTarget = "number" | "message";

/**
 * Contact slide-over (see <Sheet>). The site sends and stores nothing: the buttons hand the visitor to
 * SMS, email (their mail app, or Gmail in the browser) or a call with the message prefilled, and the
 * message can be copied for any other app.
 */
export function DayPassDrawer() {
  const { isOpen, close } = useDayPass();
  const [name, setName] = useState("");
  const [visitDate, setVisitDate] = useState<CalendarDate | null>(null);
  // null shows the copy buttons, "copied" confirms, "failed" tells the visitor to copy by hand.
  const [copy, setCopy] = useState<{ target: CopyTarget; status: "copied" | "failed" } | null>(null);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const now = useNow();

  useEffect(
    () => () => {
      if (copyTimer.current) clearTimeout(copyTimer.current);
    },
    [],
  );

  // A date picked earlier can slip into the past if the tab stays open past Manila midnight.
  const today = now ? manilaToday(now) : null;
  const preferredDate = visitDate && today && compareDates(visitDate, today) >= 0 ? visitDate : null;

  const message = buildVisitMessage({ siteName: SITE.name, name, date: preferredDate });
  const smsLink = smsHref(CONTACT.phoneE164, message);
  const mailLink = mailtoHref(CONTACT.email, EMAIL_SUBJECT, message);
  const gmailLink = gmailComposeHref(CONTACT.email, EMAIL_SUBJECT, message);

  async function copyText(target: CopyTarget, text: string) {
    if (copyTimer.current) clearTimeout(copyTimer.current);
    try {
      await navigator.clipboard.writeText(text);
      setCopy({ target, status: "copied" });
    } catch {
      // Clipboard can be blocked (insecure context, permissions). Say so rather than do nothing.
      setCopy({ target, status: "failed" });
    }
    copyTimer.current = setTimeout(() => setCopy(null), 2400);
  }

  const copied = (target: CopyTarget) => copy?.target === target && copy.status === "copied";
  const failed = (target: CopyTarget) => copy?.target === target && copy.status === "failed";

  return (
    <Sheet isOpen={isOpen} onClose={close} labelledBy="day-pass-title">
      <StickySections ids={["dp-visit", "dp-send", "dp-contact"]} scope="panel" enabled={isOpen}>
        <div className="flex items-start justify-between gap-6">
          <h2 id="day-pass-title" className="font-display text-[2.5rem] leading-[0.95] uppercase">
            Contact us
          </h2>
          <button
            type="button"
            onClick={close}
            data-sheet-close
            aria-label="Close"
            className="inline-flex size-11 shrink-0 items-center justify-center border border-line-subtle text-fg transition-colors duration-[160ms] hover:border-gold hover:text-gold"
          >
            <Close className="size-6" />
          </button>
        </div>

        <p className="mt-5 max-w-[40ch] text-muted">
          To avail your free day pass or schedule a visit, please contact us below. Pick your preferred date
          and tap text, email, or call to send your details to our team.
        </p>

        <section id="dp-visit" aria-labelledby="dp-visit-title" className="mt-8">
          <StickyBar panel as="h3" id="dp-visit-title" sectionId="dp-visit">
            Visit details
          </StickyBar>
          <div className="mt-6 space-y-5">
            <div>
              <label htmlFor="dp-name" className="mb-2 block font-mono text-[0.8125rem] text-muted">
                Your name (optional)
              </label>
              <input
                id="dp-name"
                type="text"
                name="name"
                autoComplete="name"
                maxLength={MAX_NAME_LENGTH}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Juan dela Cruz"
                className={field}
              />
            </div>
            <div>
              <p className="mb-2 block font-mono text-[0.8125rem] text-muted">Preferred visit date</p>
              <VisitCalendar value={preferredDate} onChange={setVisitDate} />
            </div>
          </div>
        </section>

        <section id="dp-send" aria-labelledby="dp-send-title" className="mt-8">
          <StickyBar panel as="h3" id="dp-send-title" sectionId="dp-send">
            Send request
          </StickyBar>
          <div className="mt-6 grid gap-3">
            <a href={smsLink} className={buttonClasses("primary", "md", "w-full")}>
              <MessageSquare className="size-[1.1em]" />
              Text us
            </a>
            <a href={mailLink} className={buttonClasses("outline", "md", "w-full")}>
              <Mail className="size-[1.1em]" />
              Email us
            </a>
            <a href={`tel:${CONTACT.phoneE164}`} className={buttonClasses("outline", "md", "w-full")}>
              <Phone className="size-[1.1em]" />
              Call {CONTACT.phoneDisplay}
            </a>
          </div>

          {/* For visitors whose device has no SMS or mail app (common on desktop): a Gmail draft, or the text itself. */}
          <p className="mt-5 font-mono text-[0.8125rem] text-muted">No SMS or mail app on this device?</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <a
              href={gmailLink}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses("outline", "md", "w-full")}
            >
              <ArrowUpRight className="size-[1.1em] shrink-0" />
              Email with Gmail
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <button
              type="button"
              onClick={() => copyText("message", message)}
              className={buttonClasses("outline", "md", "w-full")}
            >
              {copied("message") ? (
                <Check className="size-[1.1em] shrink-0 text-gold" />
              ) : (
                <Copy className="size-[1.1em] shrink-0" />
              )}
              {copied("message") ? "Copied" : "Copy message"}
            </button>
          </div>
          <p role="status" className="mt-3 min-h-5 font-mono text-[0.8125rem] text-muted">
            {copied("message")
              ? `Message copied. Paste it into any app and send it to ${CONTACT.phoneDisplay}.`
              : null}
            {failed("message") ? "Couldn't copy. Select the message text and copy it." : null}
          </p>
        </section>

        <section id="dp-contact" aria-labelledby="dp-contact-title" className="mt-8">
          <StickyBar panel as="h3" id="dp-contact-title" sectionId="dp-contact">
            Direct contact
          </StickyBar>
          <div className="mt-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="font-mono text-[0.9375rem] text-fg">{CONTACT.phoneDisplay}</p>
              <button
                type="button"
                onClick={() => copyText("number", CONTACT.phoneDisplay)}
                className={copyButton}
              >
                {copied("number") ? <Check className="size-4 text-gold" /> : <Copy className="size-4" />}
                {copied("number") ? "Copied" : "Copy number"}
              </button>
            </div>
            {/* One live region for both outcomes: sighted visitors see the message, screen readers hear it. */}
            <p role="status" className="mt-3 min-h-5 font-mono text-[0.8125rem] text-muted">
              {copied("number") ? "Phone number copied." : null}
              {failed("number") ? "Couldn't copy. Select the number above and copy it." : null}
            </p>
            <p className="mt-4 font-mono text-[0.8125rem] break-all text-muted">{CONTACT.email}</p>
            <OpenBadge className="mt-6" />
          </div>
        </section>
      </StickySections>
    </Sheet>
  );
}
