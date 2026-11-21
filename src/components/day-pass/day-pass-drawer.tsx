"use client";

import { useState } from "react";
import { OpenBadge } from "@/components/hours/open-badge";
import { buttonClasses } from "@/components/ui/button";
import { Check, Close, Copy, Mail, MessageSquare, Phone } from "@/components/ui/icons";
import { Sheet } from "@/components/ui/sheet";
import { CONTACT, SITE } from "@/lib/site";
import { useDayPass } from "./day-pass-provider";
import { VisitCalendar, formatCalendarDate, type CalendarDate } from "./visit-calendar";

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
  const [copied, setCopied] = useState(false);

  const cleanName = name.trim().slice(0, 60);
  const lines = [
    `Hi ${SITE.name}, I'd like to claim a free day pass.`,
    cleanName ? `Name: ${cleanName}` : null,
    visitDate ? `Preferred date: ${formatCalendarDate(visitDate)}` : null,
  ].filter(Boolean);
  const message = lines.join("\n");

  const smsHref = `sms:${CONTACT.phoneE164}?&body=${encodeURIComponent(message)}`;
  const mailHref =
    `mailto:${CONTACT.email}?subject=${encodeURIComponent("Free day pass request")}` +
    `&body=${encodeURIComponent(message)}`;

  async function copyNumber() {
    try {
      await navigator.clipboard.writeText(CONTACT.phoneDisplay);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked (insecure context, permissions). The number is on screen anyway.
    }
  }

  return (
    <Sheet isOpen={isOpen} onClose={close} labelledBy="day-pass-title">
      <div>
        <div className="flex items-start justify-between gap-6">
          <h2 id="day-pass-title" className="font-display text-[2.5rem] leading-[0.95] uppercase">
            Get your free day pass
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
          Tell us who is coming and when. One tap opens a message to the team with the details filled in.
          Nothing is sent until you press send.
        </p>

        <div className="mt-8 space-y-5">
          <div>
            <label htmlFor="dp-name" className="mb-2 block font-mono text-[0.8125rem] text-muted">
              Your name (optional)
            </label>
            <input
              id="dp-name"
              type="text"
              name="name"
              autoComplete="name"
              maxLength={60}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Juan dela Cruz"
              className={field}
            />
          </div>
          <div>
            <p className="mb-2 block font-mono text-[0.8125rem] text-muted">Preferred visit date</p>
            <VisitCalendar value={visitDate} onChange={setVisitDate} />
          </div>
        </div>

        <div className="mt-8 grid gap-3">
          <a href={smsHref} className={buttonClasses("primary", "md", "w-full")}>
            <MessageSquare className="size-[1.1em]" />
            Text us
          </a>
          <a href={mailHref} className={buttonClasses("outline", "md", "w-full")}>
            <Mail className="size-[1.1em]" />
            Email us
          </a>
          <a href={`tel:${CONTACT.phoneE164}`} className={buttonClasses("outline", "md", "w-full")}>
            <Phone className="size-[1.1em]" />
            Call {CONTACT.phoneDisplay}
          </a>
        </div>

        <div className="mt-8 border-t border-line-subtle pt-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="font-mono text-[0.9375rem] text-fg">{CONTACT.phoneDisplay}</p>
            <button
              type="button"
              onClick={copyNumber}
              className="inline-flex h-10 items-center gap-2 border border-line-subtle px-4 font-mono text-[0.8125rem] text-fg transition-colors duration-[160ms] hover:border-gold hover:text-gold"
            >
              {copied ? <Check className="size-4 text-gold" /> : <Copy className="size-4" />}
              {copied ? "Copied" : "Copy number"}
            </button>
          </div>
          <span role="status" className="sr-only">
            {copied ? "Phone number copied" : ""}
          </span>
          <p className="mt-4 font-mono text-[0.8125rem] break-all text-muted">{CONTACT.email}</p>
          <OpenBadge className="mt-6" />
        </div>
      </div>
    </Sheet>
  );
}
