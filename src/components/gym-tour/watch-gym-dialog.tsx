"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useDayPass } from "@/components/day-pass/day-pass-provider";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight, Clock, Close, MapPin, Play } from "@/components/ui/icons";
import { STACK_PUSH_MS, StackPushSheet } from "@/components/ui/stack-push-sheet";
import { StickyBar, StickySections } from "@/components/ui/sticky-sections";
import { NamedIcon } from "@/components/ui/zone-icons";
import { PROMO_VIDEO, TOUR_PHOTOS } from "@/content/tour";
import { cn } from "@/lib/cn";
import { HOURS, formatMinutes } from "@/lib/hours";
import { ADDRESS } from "@/lib/site";

/**
 * "Explore the gym": a button plus a native stack-push view with a photo switcher and the gym's
 * portrait (9:16) promotional video. The Google Drive iframe mounts only after the 450ms stack
 * push finishes (keeping motion at 60fps) and unmounts immediately on close.
 */
export function WatchGymButton({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [index, setIndex] = useState(0);
  const { open: openDayPass } = useDayPass();
  const photo = TOUR_PHOTOS[index];
  const close = () => {
    setVideoReady(false);
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => setVideoReady(true), STACK_PUSH_MS + 30);
    return () => clearTimeout(timer);
  }, [isOpen]);

  function claimPass() {
    close();
    setTimeout(openDayPass, STACK_PUSH_MS + 30);
  }

  return (
    <>
      <Button variant="outline" className={className} onClick={() => setIsOpen(true)} aria-haspopup="dialog">
        <Play className="size-[1.1em]" />
        See the floor
      </Button>

      <StackPushSheet isOpen={isOpen} onClose={close} labelledBy="watch-gym-title">
        <StickySections ids={["tour-gallery", "tour-video"]} scope="panel" enabled={isOpen}>
          <div className="flex items-start justify-between gap-6">
            <h2
              id="watch-gym-title"
              tabIndex={-1}
              className="font-display text-[2.5rem] leading-[0.95] uppercase focus:outline-none"
            >
              Inside Gold&rsquo;s Gym Iloilo
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

          <section id="tour-gallery" aria-labelledby="tour-gallery-title" className="mt-8">
            <StickyBar panel as="h3" id="tour-gallery-title" sectionId="tour-gallery">
              Floor gallery
            </StickyBar>
            <figure className="mt-6">
              <div className="relative aspect-[16/10] overflow-hidden border border-line bg-canvas">
                <Image
                  key={photo.id}
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 768px) 62rem, 100vw"
                  quality={85}
                  className="object-cover"
                  style={{ objectPosition: photo.position }}
                />
              </div>
              <figcaption aria-live="polite" className="mt-3 font-mono text-[0.8125rem] text-muted">
                {photo.label} ({index + 1} of {TOUR_PHOTOS.length})
              </figcaption>
            </figure>

            <div role="group" aria-label="Choose a photo" className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-8">
              {TOUR_PHOTOS.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  aria-label={`Show ${p.label}`}
                  aria-pressed={i === index}
                  onClick={() => setIndex(i)}
                  className={cn(
                    "relative aspect-square overflow-hidden border transition-[border-color,opacity] duration-[160ms]",
                    i === index ? "border-gold" : "border-line-subtle opacity-70 hover:opacity-100",
                  )}
                >
                  <Image
                    src={p.src}
                    alt=""
                    fill
                    sizes="96px"
                    quality={75}
                    className="object-cover"
                    style={{ objectPosition: p.position }}
                  />
                </button>
              ))}
            </div>
          </section>

          <section id="tour-video" aria-labelledby="tour-video-title" className="mt-10">
            <StickyBar panel as="h3" id="tour-video-title" sectionId="tour-video">
              Promotional video
            </StickyBar>
            <div className="mt-6 grid gap-6 sm:grid-cols-[minmax(0,350px)_1fr] sm:items-stretch lg:gap-8">
              {/* Portrait 9:16 frame, exactly the video's own shape so it fills edge to edge with no
                  letterbox bars. Any other ratio shows black bars around the Drive player. The iframe
                  only exists while the dialog is open. */}
              <div className="relative mx-auto aspect-[9/16] w-full max-w-[350px] overflow-hidden border border-line bg-canvas sm:mx-0">
                <p className="absolute inset-0 grid place-items-center font-mono text-[0.8125rem] text-muted">
                  Loading video&hellip;
                </p>
                {isOpen && videoReady ? (
                  <iframe
                    src={PROMO_VIDEO.previewUrl}
                    title={PROMO_VIDEO.title}
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                    loading="lazy"
                    className="absolute inset-0 h-full w-full border-0"
                  />
                ) : null}
              </div>

              {/* Editorial companion panel filling the wide drawer beside the 9:16 video. */}
              <div className="flex flex-col justify-center border border-line-subtle bg-surface p-6 lg:p-8">
                <div>
                  <h4 className="font-display text-[2rem] leading-[0.95] text-fg uppercase">
                    See the floor in motion.
                  </h4>
                  <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">
                    Step inside our training floor—Gym80 strength machines, free weights, cardio bay, and open
                    conditioning space built for serious work.
                  </p>

                  <ul className="mt-6 divide-y divide-line-subtle border-y border-line-subtle text-[0.9375rem] leading-relaxed">
                    <li className="flex items-start gap-3 py-3.5 text-fg">
                      <NamedIcon name="dumbbell" className="mt-1 size-4 shrink-0 text-gold" />
                      <span>Free Weights, Gym80 Strength, Cardio Bay, Functional Training</span>
                    </li>
                    <li className="flex items-start gap-3 py-3.5 text-fg tabular-nums">
                      <Clock className="mt-1 size-4 shrink-0 text-gold" />
                      <span>
                        {HOURS.map((r) => (
                          <span key={r.label} className="block">
                            {r.label}: {formatMinutes(r.open)} – {formatMinutes(r.close)}
                          </span>
                        ))}
                      </span>
                    </li>
                    <li className="flex items-start gap-3 py-3.5 text-fg">
                      <MapPin className="mt-1 size-4 shrink-0 text-gold" />
                      <span>{ADDRESS.oneLine}</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-6 space-y-3">
                  <Button variant="primary" className="w-full" onClick={claimPass}>
                    Contact us
                    <ArrowRight className="size-[1.1em]" />
                  </Button>
                  <p className="text-center">
                    <a
                      href={PROMO_VIDEO.shareUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline inline-flex items-center gap-1.5 text-[0.875rem] text-muted hover:text-fg"
                    >
                      Open video in new tab
                      <ArrowUpRight className="size-4 text-gold" />
                      <span className="sr-only"> (opens Google Drive in a new tab)</span>
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </section>
        </StickySections>
      </StackPushSheet>
    </>
  );
}
