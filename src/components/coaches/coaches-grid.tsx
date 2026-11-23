"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useDayPass } from "@/components/day-pass/day-pass-provider";
import { ArrowRight } from "@/components/ui/icons";
import type { Coach } from "@/content/coaches";
import { DIALOG_CLOSE_MS } from "@/lib/use-modal-dialog";
import { CoachModal, SpecializationIcon } from "./coach-modal";

/** The three coach cards. Each card is a real button that opens that coach's profile modal. */
export function CoachesGrid({ coaches }: { coaches: Coach[] }) {
  const { open: openDayPass } = useDayPass();
  // `index` outlives `isOpen` so the profile stays visible while the modal animates out.
  const [index, setIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const handoff = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cards = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(
    () => () => {
      if (handoff.current) clearTimeout(handoff.current);
    },
    [],
  );

  // The browser returns focus to the card that opened the modal, but the visitor may have browsed to a
  // different coach since. Move focus to the card of the coach they were last looking at.
  const focusCurrentCard = () => cards.current[index]?.focus();

  const openCoach = (i: number) => {
    setIndex(i);
    setIsOpen(true);
  };

  const closeCoach = () => {
    setIsOpen(false);
    if (handoff.current) clearTimeout(handoff.current);
    handoff.current = setTimeout(focusCurrentCard, DIALOG_CLOSE_MS + 10);
  };

  // Close the profile first, then open the day-pass drawer once it has finished closing. Focus is put
  // on the current coach's card just before, so closing the drawer lands there too.
  const train = () => {
    setIsOpen(false);
    if (handoff.current) clearTimeout(handoff.current);
    handoff.current = setTimeout(() => {
      focusCurrentCard();
      openDayPass();
    }, DIALOG_CLOSE_MS + 30);
  };

  return (
    <>
      <section aria-labelledby="coaches-list-title" className="shell pb-[var(--section-y)]">
        <h2 id="coaches-list-title" className="sr-only">
          Our coaches
        </h2>
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {coaches.map((coach, i) => (
            <li
              key={coach.id}
              className="deck-reveal flex"
              style={{ "--delay": `${180 + i * 120}ms` } as CSSProperties}
            >
              <button
                ref={(el) => {
                  cards.current[i] = el;
                }}
                type="button"
                onClick={() => openCoach(i)}
                aria-haspopup="dialog"
                aria-label={`View profile: ${coach.name}`}
                className="hairline hairline-gold group flex w-full cursor-pointer flex-col bg-surface text-left"
              >
                {/* Portraits are 2:3. A 4:5 frame pinned to the top keeps every head and face in view. */}
                <span className="relative block aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src={coach.image.src}
                    alt={coach.image.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    quality={85}
                    className="object-cover object-top transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  />
                </span>
                <span className="flex flex-1 flex-col p-6 xl:p-7">
                  <span className="block font-display text-[clamp(1.75rem,3vw,2.25rem)] leading-[1] uppercase">
                    {coach.name}
                  </span>
                  <span className="mt-3 block font-label text-[1.25rem] leading-none tracking-[0.1em] text-gold uppercase">
                    {coach.role}
                  </span>
                  <span className="mt-6 grid grid-cols-1 gap-2 xl:grid-cols-2">
                    {coach.specialties.map((s) => (
                      <span
                        key={s}
                        className="inline-flex items-center justify-center gap-1.5 border border-line-subtle bg-canvas/55 px-2.5 py-2 text-[0.75rem] font-medium whitespace-nowrap text-fg"
                      >
                        <SpecializationIcon label={s} className="size-3.5 shrink-0 text-gold" />
                        <span>{s}</span>
                      </span>
                    ))}
                  </span>
                  <span className="mt-auto flex items-center gap-2 pt-8 font-label text-[1.25rem] leading-none tracking-[0.06em] text-fg uppercase transition-colors duration-[160ms] group-hover:text-gold">
                    View profile
                    <ArrowRight className="size-[1.1em] transition-transform duration-[240ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1" />
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <CoachModal
        coaches={coaches}
        index={index}
        isOpen={isOpen}
        onIndexChange={setIndex}
        onClose={closeCoach}
        onTrain={train}
      />
    </>
  );
}
