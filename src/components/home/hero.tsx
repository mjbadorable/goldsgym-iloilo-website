import Image from "next/image";
import type { CSSProperties } from "react";
import { DayPassButton } from "@/components/day-pass/day-pass-button";
import { WatchGymButton } from "@/components/gym-tour/watch-gym-dialog";

const line = (i: number) => ({ "--i": i }) as CSSProperties;

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      {/* Athlete anchored right and blended into the canvas: scrims keep all copy on near-solid dark. */}
      <div aria-hidden="true" className="absolute inset-y-0 right-0 -z-10 w-full lg:w-[62%]">
        <Image
          src="/images/hero-athlete.jpg"
          alt=""
          fill
          sizes="(min-width: 1024px) 62vw, 100vw"
          quality={85}
          loading="eager"
          fetchPriority="high"
          className="hero-settle object-cover object-[60%_30%] lg:object-[50%_38%]"
        />
        <div className="absolute inset-0 bg-canvas/65 lg:bg-transparent" />
        <div className="scrim-x absolute inset-0" />
        <div className="scrim-y absolute inset-0" />
      </div>

      <div className="mx-auto flex min-h-[600px] max-w-[1280px] items-center px-6 py-16 md:px-10 lg:min-h-[680px]">
        <div className="max-w-[40rem]">
          <h1
            id="hero-title"
            className="font-display text-[clamp(3.5rem,10vw,6rem)] leading-[0.95] uppercase"
          >
            <span className="reveal-line" style={line(0)}>
              <span className="mb-4 block font-label text-[clamp(1.25rem,2.4vw,1.75rem)] leading-none tracking-[0.14em] text-fg/90">
                Gold&rsquo;s Gym Iloilo
              </span>
            </span>
            <span className="reveal-line" style={line(1)}>
              <span>Your strongest</span>
            </span>{" "}
            <span className="reveal-line text-gold" style={line(2)}>
              <span>Starts here.</span>
            </span>
          </h1>

          <p className="mt-6 max-w-[34ch] text-[1.125rem] text-fg/85">
            Train with purpose. Build strength. Keep progressing.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <DayPassButton />
            <WatchGymButton />
          </div>
        </div>
      </div>
    </section>
  );
}
