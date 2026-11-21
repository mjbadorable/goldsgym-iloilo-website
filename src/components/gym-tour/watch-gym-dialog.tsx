"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Close, Play } from "@/components/ui/icons";
import { Sheet } from "@/components/ui/sheet";
import { cn } from "@/lib/cn";
import { REELS, TOUR_PHOTOS } from "@/content/tour";

/**
 * "Watch the gym": a button plus a slide-over with a photo switcher and links to three Facebook
 * Reels. The reels open on facebook.com in a new tab; nothing is embedded, so no third-party
 * scripts or cookies load on this site.
 */
export function WatchGymButton({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const photo = TOUR_PHOTOS[index];
  const close = () => setIsOpen(false);

  return (
    <>
      <Button variant="outline" className={className} onClick={() => setIsOpen(true)} aria-haspopup="dialog">
        <Play className="size-[1.1em]" />
        Watch the gym
      </Button>

      <Sheet isOpen={isOpen} onClose={close} labelledBy="watch-gym-title" wide>
        <div className="flex items-start justify-between gap-6">
          <h2 id="watch-gym-title" className="font-display text-[2.5rem] leading-[0.95] uppercase">
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

        <figure className="mt-8">
          <div className="relative aspect-[16/10] overflow-hidden border border-line bg-canvas">
            <Image
              key={photo.id}
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 768px) 46rem, 100vw"
              quality={85}
              className="object-cover"
              style={{ objectPosition: photo.position }}
            />
          </div>
          <figcaption aria-live="polite" className="mt-3 font-mono text-[0.8125rem] text-muted">
            {photo.label} ({index + 1} of {TOUR_PHOTOS.length})
          </figcaption>
        </figure>

        <div role="group" aria-label="Choose a photo" className="mt-4 grid grid-cols-6 gap-2">
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

        <div className="mt-10 border-t border-line-subtle pt-8">
          <h3 className="font-label text-[1.5rem] leading-none tracking-[0.06em] uppercase">
            Watch the Reels
          </h3>
          <ul className="mt-5 grid gap-3 sm:grid-cols-3">
            {REELS.map((reel, i) => (
              <li key={reel.id}>
                <a
                  href={reel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hairline flex h-full flex-col justify-between gap-6 bg-surface p-5 transition-colors duration-[160ms] hover:bg-elevated"
                >
                  <span className="inline-flex size-10 items-center justify-center border border-line text-gold">
                    <Play className="size-5" />
                  </span>
                  <span>
                    <span className="block font-label text-[1.25rem] leading-none tracking-[0.04em] uppercase">
                      Facebook Reel {i + 1}
                    </span>
                    <span className="mt-2 flex items-center gap-1.5 font-mono text-[0.8125rem] text-muted">
                      Opens on Facebook
                      <ArrowUpRight className="size-4 text-gold" />
                    </span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Sheet>
    </>
  );
}
