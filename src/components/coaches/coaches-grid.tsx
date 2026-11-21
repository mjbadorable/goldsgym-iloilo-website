"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useDayPass } from "@/components/day-pass/day-pass-provider";
import { ArrowRight } from "@/components/ui/icons";
import type { Coach } from "@/content/coaches";
import { DIALOG_CLOSE_MS } from "@/lib/use-modal-dialog";
import { CoachModal } from "./coach-modal";

/** The three coach cards. Each card is a real button that opens that coach's profile modal. */
export function CoachesGrid({ coaches }: { coaches: Coach[] }) {
  const { open: openDayPass } = useDayPass();
  // `index` outlives `isOpen` so the profile stays visible while the modal animates out.
  const [index, setIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const handoff = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (handoff.current) clearTimeout(handoff.current);
    },
    [],
  );

  const openCoach = (i: number) => {
    setIndex(i);
    setIsOpen(true);
  };

  // Close the profile first, then open the day-pass drawer once it has finished closing. That way
  // focus returns to the card, and returns there again when the drawer is closed.
  const train = () => {
    setIsOpen(false);
    handoff.current = setTimeout(openDayPass, DIALOG_CLOSE_MS + 30);
  };

  return (
    <>
      <section aria-labelledby="coaches-list-title" className="mx-auto max-w-[1280px] px-6 pb-16 md:px-10 lg:pb-24">
        <h2 id="coaches-list-title" className="sr-only">
          Our coaches
        </h2>
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {coaches.map((coach, i) => (
            <li key={coach.id} className="flex">
              <button
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
                <span className="flex flex-1 flex-col p-6 md:p-8">
                  <span className="block font-display text-[clamp(1.75rem,3vw,2.25rem)] leading-[1] uppercase">
                    {coach.name}
                  </span>
                  <span className="mt-3 block font-label text-[1.25rem] leading-none tracking-[0.1em] text-gold uppercase">
                    {coach.role}
                  </span>
                  <span className="mt-6 flex flex-wrap gap-2">
                    {coach.specialties.map((s) => (
                      <span
                        key={s}
                        className="border border-line-subtle px-3 py-1.5 font-mono text-[0.8125rem] text-fg"
                      >
                        {s}
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
        onClose={() => setIsOpen(false)}
        onTrain={train}
      />
    </>
  );
}
