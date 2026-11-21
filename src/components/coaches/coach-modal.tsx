"use client";

import Image from "next/image";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check, Close } from "@/components/ui/icons";
import type { Coach } from "@/content/coaches";
import { cn } from "@/lib/cn";
import { useModalDialog } from "@/lib/use-modal-dialog";

type Props = {
  coaches: Coach[];
  index: number;
  isOpen: boolean;
  onIndexChange: (next: number) => void;
  onClose: () => void;
  /** "Train with <first name>": the parent closes this modal, then opens the day-pass drawer. */
  onTrain: () => void;
};

const sectionTitle = "font-label text-[1.25rem] leading-none tracking-[0.1em] text-gold uppercase";
const section = "mt-6 border-t border-line-subtle pt-6";

/**
 * Enlarged, centered coach profile: portrait on the left, details on the right, and
 * Previous / Next so visitors can browse all coaches without closing it.
 */
export function CoachModal({ coaches, index, isOpen, onIndexChange, onClose, onTrain }: Props) {
  const { ref, dialogProps } = useModalDialog(isOpen, onClose);
  const detailsRef = useRef<HTMLDivElement>(null);
  const coach = coaches[index];
  const firstName = coach.name.split(" ")[0];

  const go = (delta: number) => {
    onIndexChange((index + delta + coaches.length) % coaches.length);
    detailsRef.current?.scrollTo({ top: 0 });
  };

  return (
    <dialog
      ref={ref}
      className="coach-modal"
      aria-labelledby="coach-modal-title"
      {...dialogProps}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
    >
      <div className="coach-modal-panel md:grid md:grid-cols-[45fr_55fr]">
        <button
          type="button"
          onClick={onClose}
          data-sheet-close
          aria-label="Close"
          className="absolute top-3 right-3 z-10 inline-flex size-11 items-center justify-center border border-line-subtle bg-canvas/80 text-fg transition-colors duration-[160ms] hover:border-gold hover:text-gold"
        >
          <Close className="size-6" />
        </button>

        {/* All portraits are stacked so switching is a cross-fade, not a reload. */}
        <div className="relative aspect-[4/5] border-b border-line-subtle md:aspect-auto md:h-full md:min-h-[560px] md:border-r md:border-b-0">
          {coaches.map((c, i) => (
            <Image
              key={c.id}
              src={c.image.src}
              alt={i === index ? c.image.alt : ""}
              aria-hidden={i === index ? undefined : true}
              fill
              sizes="(min-width: 960px) 432px, (min-width: 768px) 45vw, 100vw"
              quality={85}
              className={cn(
                "object-cover object-top transition-opacity duration-[240ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                i === index ? "opacity-100" : "opacity-0",
              )}
            />
          ))}
        </div>

        <div className="flex min-h-0 flex-col md:max-h-[calc(100dvh-48px)]">
          <div ref={detailsRef} className="flex-1 overflow-y-auto p-6 md:p-10 md:pb-6">
            <div key={coach.id} className="coach-swap">
              <h2
                id="coach-modal-title"
                className="pr-12 font-display text-[clamp(2rem,4vw,3rem)] leading-[0.98] uppercase"
              >
                {coach.name}
              </h2>
              <p className="mt-3 font-label text-[1.25rem] leading-none tracking-[0.1em] text-gold uppercase">
                {coach.role}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Specialties">
                {coach.specialties.map((s) => (
                  <li key={s} className="border border-line-subtle px-3 py-1.5 font-mono text-[0.8125rem] text-fg">
                    {s}
                  </li>
                ))}
              </ul>

              {/* Primary action sits above the fold of the scrolling column, before the long-form sections. */}
              <Button className="mt-6 w-full sm:w-auto" onClick={onTrain}>
                Train with {firstName}
                <ArrowRight className="size-[1.1em]" />
              </Button>

              <section className={section} aria-labelledby="coach-about">
                <h3 id="coach-about" className={sectionTitle}>
                  About &amp; coaching approach
                </h3>
                <p className="mt-3 max-w-[56ch] text-[1rem] text-muted">{coach.bio}</p>
              </section>

              <section className={section} aria-labelledby="coach-experience">
                <h3 id="coach-experience" className={sectionTitle}>
                  Experience &amp; focus
                </h3>
                <p className="mt-3 max-w-[56ch] text-[1rem] text-muted">{coach.experience}</p>
                <ul className="mt-4 flex flex-wrap gap-2" aria-label="Coaching focus">
                  {coach.coachingFocus.map((f) => (
                    <li key={f} className="border border-line px-3 py-1.5 font-mono text-[0.8125rem] text-fg">
                      {f}
                    </li>
                  ))}
                </ul>
              </section>

              <section className={section} aria-labelledby="coach-highlights">
                <h3 id="coach-highlights" className={sectionTitle}>
                  Highlights
                </h3>
                <ul className="mt-3 space-y-2">
                  {coach.achievements.map((a) => (
                    <li key={a} className="flex items-start gap-3 text-[1rem] text-muted">
                      <Check className="mt-1 size-4 shrink-0 text-gold" />
                      {a}
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>

          <nav
            aria-label="Browse coaches"
            className="sticky bottom-0 z-[1] flex items-center justify-between gap-3 border-t border-line-subtle bg-elevated p-4 md:px-10"
          >
            <Button variant="outline" size="sm" onClick={() => go(-1)}>
              <ArrowLeft className="size-[1.1em]" />
              <span className="hidden sm:inline">Previous coach</span>
              <span className="sm:hidden">Previous</span>
            </Button>
            <p className="font-mono text-[0.8125rem] text-muted" aria-live="polite">
              {index + 1} of {coaches.length}
            </p>
            <Button variant="outline" size="sm" onClick={() => go(1)}>
              <span className="hidden sm:inline">Next coach</span>
              <span className="sm:hidden">Next</span>
              <ArrowRight className="size-[1.1em]" />
            </Button>
          </nav>
        </div>
      </div>
    </dialog>
  );
}
