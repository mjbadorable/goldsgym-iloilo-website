"use client";

import { useEffect, useRef, useState } from "react";
import { OpenBadge } from "@/components/hours/open-badge";
import { buttonClasses } from "@/components/ui/button";
import { Check, Close, Copy, Mail, MessageSquare, Phone } from "@/components/ui/icons";
import { Sheet } from "@/components/ui/sheet";
import { StickyBar, StickySections } from "@/components/ui/sticky-sections";
import { CONTACT, SITE } from "@/lib/site";
import { useNow } from "@/lib/use-manila-now";
import { compareDates, manilaToday, type CalendarDate } from "@/lib/visit-date";
import { MAX_NAME_LENGTH, buildVisitMessage, mailtoHref, smsHref } from "@/lib/visit-message";
import { useDayPass } from "./day-pass-provider";
import { VisitCalendar } from "./visit-calendar";

const field =
  "h-12 w-full border border-line-subtle bg-canvas px-4 text-fg transition-colors duration-[160ms] " +
  "placeholder:text-muted hover:border-line focus:border-gold focus:outline-none " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

/**
 * Free Day Pass slide-over (see <Sheet>). The site sends and stores nothing: the buttons hand the
 * visitor to SMS, email or a call with the message prefilled.
 */
export function DayPassDrawer() {
  const { isOpen, close } = useDayPass();
  const [name, setName] = useState("");
  const [visitDate, setVisitDate] = useState<CalendarDate | null>(null);
  // "idle" shows the copy button, "copied" confirms, "failed" tells the visitor to copy by hand.
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");
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
  const mailLink = mailtoHref(CONTACT.email, "Gym visit inquiry", message);

  async function copyNumber() {
    if (copyTimer.current) clearTimeout(copyTimer.current);
    try {
      await navigator.clipboard.writeText(CONTACT.phoneDisplay);
      setCopyState("copied");
    } catch {
      // Clipboard can be blocked (insecure context, permissions). Say so rather than do nothing.
      setCopyState("failed");
    }
    copyTimer.current = setTimeout(() => setCopyState("idle"), 2400);
  }

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
                onClick={copyNumber}
                className="inline-flex h-10 items-center gap-2 border border-line-subtle px-4 font-mono text-[0.8125rem] text-fg transition-colors duration-[160ms] hover:border-gold hover:text-gold"
              >
                {copyState === "copied" ? (
                  <Check className="size-4 text-gold" />
                ) : (
                  <Copy className="size-4" />
                )}
                {copyState === "copied" ? "Copied" : "Copy number"}
              </button>
            </div>
            {/* One live region for both outcomes: sighted visitors see the message, screen readers hear it. */}
            <p role="status" className="mt-3 min-h-5 font-mono text-[0.8125rem] text-muted">
              {copyState === "copied" ? "Phone number copied." : null}
              {copyState === "failed" ? "Couldn't copy. Select the number above and copy it." : null}
            </p>
            <p className="mt-4 font-mono text-[0.8125rem] break-all text-muted">{CONTACT.email}</p>
            <OpenBadge className="mt-6" />
          </div>
        </section>
      </StickySections>
    </Sheet>
  );
}
