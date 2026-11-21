import Image from "next/image";
import type { CSSProperties } from "react";
import { DayPassButton } from "@/components/day-pass/day-pass-button";
import { OpenBadge } from "@/components/hours/open-badge";
import { ButtonLink } from "@/components/ui/button";

const line = (i: number) => ({ "--i": i }) as CSSProperties;

export function Hero() {
  return (
    <section aria-labelledby="hero-title">
      <div className="mx-auto grid max-w-[1280px] items-center gap-10 px-6 pt-10 pb-16 md:px-10 lg:min-h-[calc(100svh-var(--nav-h))] lg:grid-cols-12 lg:gap-8 lg:py-16">
        <div className="lg:col-span-7">
          <h1
            id="hero-title"
            className="font-display text-[clamp(3.5rem,11vw,6rem)] leading-[0.95] uppercase"
          >
            <span className="reveal-line" style={line(0)}>
              <span>Your strongest</span>
            </span>{" "}
            <span className="reveal-line text-gold" style={line(1)}>
              <span>Starts here.</span>
            </span>
          </h1>

          <p className="mt-6 max-w-[34ch] text-[1.125rem] text-muted">
            Train with purpose. Build strength. Keep progressing.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <DayPassButton />
            <ButtonLink href="/why-gold-s-gym" variant="outline">
              Explore the gym
            </ButtonLink>
          </div>

          <OpenBadge className="mt-8" />
        </div>

        <div className="lg:col-span-5">
          <div className="relative aspect-[4/3] overflow-hidden border border-line sm:aspect-[4/5]">
            <Image
              src="/images/hero-athlete.jpg"
              alt="A Gold's Gym member mid-set on a seated chest press machine, seen from behind"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              quality={85}
              loading="eager"
              fetchPriority="high"
              className="hero-settle object-cover object-[50%_60%] sm:object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
