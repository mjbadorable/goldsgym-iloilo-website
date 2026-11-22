"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check, Close, Trophy } from "@/components/ui/icons";
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
 * Enlarged, centered coach profile: portrait + optional competition photo gallery on the left,
 * full credentials on the right, and Previous / Next so visitors can browse all coaches.
 */
export function CoachModal({ coaches, index, isOpen, onIndexChange, onClose, onTrain }: Props) {
  const { ref, dialogProps } = useModalDialog(isOpen, onClose);
  const detailsRef = useRef<HTMLDivElement>(null);
  const [photoState, setPhotoState] = useState<{ coachId: string; idx: number }>({ coachId: "", idx: 0 });
  const coach = coaches[index];
  const firstName = coach.name.split(" ")[0];
  const activePhotoIdx = photoState.coachId === coach.id ? photoState.idx : 0;

  const photos = [
    { src: coach.image.src, alt: coach.image.alt, caption: `${coach.name} — Training Floor`, position: "50% 0%" },
    ...(coach.gallery ?? []),
  ];
  const activePhoto = photos[activePhotoIdx] ?? photos[0];

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
          className="absolute top-3 right-3 z-20 inline-flex size-11 items-center justify-center border border-line-subtle bg-canvas/80 text-fg transition-colors duration-[160ms] hover:border-gold hover:text-gold"
        >
          <Close className="size-6" />
        </button>

        {/* Left media stage: main portrait + optional competition stage photo switcher. */}
        <div className="relative flex flex-col border-b border-line-subtle bg-canvas md:h-full md:min-h-[580px] md:border-r md:border-b-0">
          <div className="relative aspect-[4/5] flex-1 overflow-hidden md:aspect-auto">
            {photos.map((p, i) => (
              <Image
                key={p.src}
                src={p.src}
                alt={i === activePhotoIdx ? p.alt : ""}
                aria-hidden={i === activePhotoIdx ? undefined : true}
                fill
                sizes="(min-width: 960px) 432px, (min-width: 768px) 45vw, 100vw"
                quality={85}
                className={cn(
                  "object-cover transition-opacity duration-[240ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                  i === activePhotoIdx ? "opacity-100" : "opacity-0",
                )}
                style={{ objectPosition: p.position ?? "50% 15%" }}
              />
            ))}
            {photos.length > 1 ? (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-canvas via-canvas/70 to-transparent"
              />
            ) : null}
          </div>

          {photos.length > 1 ? (
            <div className="border-t border-line-subtle bg-canvas/95 p-3.5">
              <p aria-live="polite" className="mb-2.5 truncate font-mono text-[0.75rem] text-muted">
                <span className="text-gold">{activePhotoIdx + 1}/{photos.length}</span>{" "}
                {activePhoto.caption}
              </p>
              <div role="group" aria-label={`${coach.name} photos`} className="grid grid-cols-5 gap-2">
                {photos.map((p, i) => (
                  <button
                    key={p.src}
                    type="button"
                    aria-label={`View ${p.caption}`}
                    aria-pressed={i === activePhotoIdx}
                    onClick={() => setPhotoState({ coachId: coach.id, idx: i })}
                    className={cn(
                      "relative aspect-square overflow-hidden border transition-[border-color,opacity] duration-[160ms]",
                      i === activePhotoIdx ? "border-gold opacity-100" : "border-line-subtle opacity-65 hover:opacity-100",
                    )}
                  >
                    <Image
                      src={p.src}
                      alt=""
                      fill
                      sizes="80px"
                      quality={75}
                      className="object-cover"
                      style={{ objectPosition: p.position ?? "50% 15%" }}
                    />
                  </button>
                ))}
              </div>
            </div>
          ) : null}
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
                  {coach.verified ? "Specializations" : "Experience & focus"}
                </h3>
                <p className="mt-3 max-w-[56ch] text-[1rem] text-muted">{coach.experience}</p>
                <ul className="mt-4 flex flex-wrap gap-2" aria-label="Coaching specializations">
                  {coach.coachingFocus.map((f) => (
                    <li key={f} className="border border-line px-3 py-1.5 font-mono text-[0.8125rem] text-fg">
                      {f}
                    </li>
                  ))}
                </ul>
              </section>

              {coach.competitions && coach.competitions.length > 0 ? (
                <section className={section} aria-labelledby="coach-competitions">
                  <h3 id="coach-competitions" className={sectionTitle}>
                    Competitions &amp; awards
                  </h3>
                  <ul className="mt-3 space-y-2.5">
                    {coach.competitions.map((comp) => (
                      <li key={comp} className="flex items-start gap-3 text-[1rem] text-fg">
                        <Trophy className="mt-1 size-4 shrink-0 text-gold" />
                        <span>{comp}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {coach.certifications && coach.certifications.length > 0 ? (
                <section className={section} aria-labelledby="coach-certifications">
                  <h3 id="coach-certifications" className={sectionTitle}>
                    Certifications
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {coach.certifications.map((cert) => (
                      <li key={cert} className="flex items-start gap-3 text-[1rem] text-muted">
                        <Check className="mt-1 size-4 shrink-0 text-gold" />
                        <span>{cert}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : (
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
              )}
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
