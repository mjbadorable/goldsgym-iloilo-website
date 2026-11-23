"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BoxingGlove,
  Check,
  Close,
  Dumbbell,
  Flame,
  HeartPulse,
  Pill,
  Pulse,
  ShieldCheck,
  Sparkle,
  Star,
  Trophy,
  User,
  Utensils,
} from "@/components/ui/icons";
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

const sectionTitle =
  "flex items-center gap-2.5 font-label text-[1.25rem] leading-none tracking-[0.1em] text-gold uppercase before:h-4 before:w-[3px] before:shrink-0 before:bg-gold";
const navLink =
  "inline-flex min-h-11 items-center gap-2 font-label text-[1.125rem] leading-none tracking-[0.08em] text-muted uppercase transition-colors duration-[160ms] hover:text-gold";

export function SpecializationIcon({ label, className }: { label: string; className?: string }) {
  const key = label.toLowerCase();
  const cls = className ?? "size-[18px] shrink-0 text-gold";
  if (key.includes("strength")) return <Dumbbell className={cls} />;
  if (key.includes("conditioning")) return <HeartPulse className={cls} />;
  if (key.includes("competition") || key.includes("prep")) return <Trophy className={cls} />;
  if (key.includes("weight") || key.includes("toning") || key.includes("fat")) return <Flame className={cls} />;
  if (key.includes("nutrition")) return <Utensils className={cls} />;
  if (key.includes("supplement")) return <Pill className={cls} />;
  if (key.includes("1-on-1") || key.includes("one-on-one") || key.includes("personal training")) return <User className={cls} />;
  if (key.includes("boxing") || key.includes("circuit")) return <BoxingGlove className={cls} />;
  if (key.includes("program") || key.includes("personalized")) return <Star className={cls} />;
  if (key.includes("movement") || key.includes("form")) return <Pulse className={cls} />;
  if (key.includes("progression")) return <ArrowUpRight className={cls} />;
  if (key.includes("accountab") || key.includes("safe") || key.includes("effective")) return <ShieldCheck className={cls} />;
  return <Sparkle className={cls} />;
}

/**
 * Coach profile, laid out like a magazine spread: portrait (with the competition photo gallery laid
 * over its foot) on the left; on the right a short intro with the primary action, then the dossier
 * (about, specializations, competitions, certifications) and a slim Previous / Next row.
 * The panel keeps one height for every coach, so switching coaches never makes it jump.
 */
export function CoachModal({ coaches, index, isOpen, onIndexChange, onClose, onTrain }: Props) {
  const { ref, dialogProps } = useModalDialog(isOpen, onClose);
  const detailsRef = useRef<HTMLDivElement>(null);
  const [photoState, setPhotoState] = useState<{ coachId: string; idx: number }>({ coachId: "", idx: 0 });
  const coach = coaches[index];
  const firstName = coach.name.split(" ")[0];
  const activePhotoIdx = photoState.coachId === coach.id ? photoState.idx : 0;

  const photos = [
    {
      src: coach.image.src,
      alt: coach.image.alt,
      caption: `${coach.name} — Training Floor`,
      position: "50% 16%",
      fit: "cover" as const,
    },
    ...(coach.gallery ?? []),
  ];
  const activePhoto = photos[activePhotoIdx] ?? photos[0];

  // The dossier scrolls inside the panel and would otherwise reopen where it was left.
  useEffect(() => {
    if (isOpen) detailsRef.current?.scrollTo({ top: 0 });
  }, [isOpen, index]);

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
      <div className="coach-modal-panel grid grid-rows-[auto_minmax(0,1fr)] md:grid-cols-[42fr_58fr] md:grid-rows-1">
        <button
          type="button"
          onClick={onClose}
          data-sheet-close
          aria-label="Close"
          className="absolute top-3 right-3 z-20 inline-flex size-11 items-center justify-center border border-line-subtle bg-canvas/80 text-fg transition-colors duration-[160ms] hover:border-gold hover:text-gold"
        >
          <Close className="size-6" />
        </button>

        {/* Left stage: the portrait, with the photo switcher laid over its gradient foot. */}
        <div className="relative aspect-[4/3] max-h-[42svh] overflow-hidden border-b border-line-subtle bg-canvas sm:aspect-square md:aspect-auto md:max-h-none md:border-r md:border-b-0">
          {photos.map((p, i) => {
            const isContain = p.fit === "contain";
            const isActive = i === activePhotoIdx;
            return (
              <div
                key={p.src}
                aria-hidden={isActive ? undefined : true}
                className={cn(
                  "absolute inset-0 transition-opacity duration-[240ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                  isActive ? "opacity-100" : "pointer-events-none opacity-0",
                )}
              >
                {isContain ? (
                  <Image
                    src={p.src}
                    alt=""
                    aria-hidden="true"
                    fill
                    sizes="(min-width: 1280px) 520px, (min-width: 768px) 42vw, 100vw"
                    quality={75}
                    className="scale-110 object-cover object-center opacity-25 blur-2xl"
                  />
                ) : null}
                <Image
                  src={p.src}
                  alt={isActive ? p.alt : ""}
                  fill
                  sizes="(min-width: 1280px) 520px, (min-width: 768px) 42vw, 100vw"
                  quality={85}
                  className={cn(isContain ? "object-contain object-center pb-20 md:pb-24" : "object-cover")}
                  style={isContain ? undefined : { objectPosition: p.position ?? "50% 15%" }}
                />
              </div>
            );
          })}

          {photos.length > 1 ? (
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-canvas via-canvas/75 to-transparent px-4 pt-14 pb-4 md:px-6 md:pt-20 md:pb-6">
              <p aria-live="polite" className="mb-2.5 truncate font-mono text-[0.75rem] text-fg/85">
                <span className="text-gold">
                  {activePhotoIdx + 1}/{photos.length}
                </span>
                <span aria-hidden="true" className="text-muted">
                  {" · "}
                </span>
                {activePhoto.caption}
              </p>
              <div role="group" aria-label={`${coach.name} photos`} className="flex gap-1.5">
                {photos.map((p, i) => (
                  <button
                    key={p.src}
                    type="button"
                    aria-label={`View ${p.caption}`}
                    aria-pressed={i === activePhotoIdx}
                    onClick={() => setPhotoState({ coachId: coach.id, idx: i })}
                    className={cn(
                      "relative size-11 shrink-0 overflow-hidden border transition-[border-color,opacity] duration-[160ms]",
                      i === activePhotoIdx
                        ? "border-gold opacity-100"
                        : "border-line-subtle opacity-70 hover:opacity-100",
                    )}
                  >
                    <Image
                      src={p.src}
                      alt=""
                      fill
                      sizes="44px"
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

        {/* Right column: scrolling dossier above a slim, always-reachable Previous / Next row. */}
        <div className="flex min-h-0 flex-col">
          <div ref={detailsRef} className="min-h-0 flex-1 overflow-y-auto px-6 pt-6 pb-8 md:px-10 md:pt-10">
            <div key={coach.id} className="coach-swap">
              <div className="border-b border-line-subtle pb-6">
                <h2
                  id="coach-modal-title"
                  className="font-display text-[clamp(2rem,3.6vw,2.75rem)] leading-[1] uppercase md:pr-12"
                >
                  {coach.name}
                </h2>
                <p className="mt-3 font-label text-[1.25rem] leading-none tracking-[0.1em] text-gold uppercase">
                  {coach.role}
                </p>
                <Button className="mt-5 w-full sm:w-auto" onClick={onTrain}>
                  Train with {firstName}
                  <ArrowRight className="size-[1.1em]" />
                </Button>
              </div>

              <div className="space-y-7 pt-7">
                <section aria-labelledby="coach-about">
                  <h3 id="coach-about" className={sectionTitle}>
                    About &amp; coaching approach
                  </h3>
                  <p className="mt-3 max-w-[64ch] text-[1rem] leading-[1.7] text-fg/85">{coach.bio}</p>
                </section>

                <section aria-labelledby="coach-experience">
                  <h3 id="coach-experience" className={sectionTitle}>
                    {coach.verified ? "Specializations" : "Experience & focus"}
                  </h3>
                  <p className="mt-3 max-w-[64ch] text-[1rem] leading-[1.7] text-fg/85">{coach.experience}</p>
                  <ul
                    className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2"
                    aria-label="Coaching specializations"
                  >
                    {coach.coachingFocus.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-3 border border-line-subtle bg-canvas/55 px-3.5 py-2.5 text-[0.9375rem] leading-snug text-fg"
                      >
                        <SpecializationIcon label={f} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {coach.competitions && coach.competitions.length > 0 ? (
                  <section aria-labelledby="coach-competitions">
                    <h3 id="coach-competitions" className={sectionTitle}>
                      Competitions &amp; awards
                    </h3>
                    <ul className="mt-3 space-y-3">
                      {coach.competitions.map((comp) => (
                        <li key={comp} className="flex items-start gap-3 text-[1rem] leading-snug text-fg">
                          <Trophy className="mt-0.5 size-5 shrink-0 text-gold" />
                          <span>{comp}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                ) : null}

                {coach.certifications && coach.certifications.length > 0 ? (
                  <section aria-labelledby="coach-certifications">
                    <h3 id="coach-certifications" className={sectionTitle}>
                      Certifications
                    </h3>
                    <ul className="mt-3 space-y-2.5">
                      {coach.certifications.map((cert) => (
                        <li key={cert} className="flex items-start gap-3 text-[1rem] leading-snug text-fg">
                          <Check className="mt-0.5 size-5 shrink-0 text-gold" />
                          <span>{cert}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                ) : !coach.verified ? (
                  <section aria-labelledby="coach-highlights">
                    <h3 id="coach-highlights" className={sectionTitle}>
                      Highlights
                    </h3>
                    <ul className="mt-3 space-y-2.5">
                      {coach.achievements.map((a) => (
                        <li key={a} className="flex items-start gap-3 text-[1rem] leading-snug text-fg">
                          <Check className="mt-0.5 size-5 shrink-0 text-gold" />
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                ) : null}
              </div>
            </div>
          </div>

          <nav
            aria-label="Browse coaches"
            className="flex shrink-0 items-center justify-between gap-3 border-t border-line-subtle px-6 py-2 md:px-10"
          >
            <button type="button" onClick={() => go(-1)} className={navLink}>
              <ArrowLeft className="size-[1.1em]" />
              Previous
            </button>
            <p className="font-mono text-[0.8125rem] text-muted" aria-live="polite">
              {index + 1} / {coaches.length}
            </p>
            <button type="button" onClick={() => go(1)} className={navLink}>
              Next
              <ArrowRight className="size-[1.1em]" />
            </button>
          </nav>
        </div>
      </div>
    </dialog>
  );
}
