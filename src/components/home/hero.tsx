import Image from "next/image";
import type { CSSProperties } from "react";
import { DayPassButton } from "@/components/day-pass/day-pass-button";
import { WatchGymButton } from "@/components/gym-tour/watch-gym-dialog";

const line = (i: number) => ({ "--i": i }) as CSSProperties;
const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

/**
 * The hero is sized so that hero + highlight strip (116px) fill exactly one screen on common
 * desktops (1280x720, 1440x900, 1920x1080). The athlete backdrop is full-bleed; the copy sits in the shell.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      {/* Athlete anchored right and blended into the canvas: overflow-hidden clips hero-settle cleanly. */}
      <div aria-hidden="true" className="absolute inset-y-0 right-0 -z-10 w-full overflow-hidden lg:w-[62%]">
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
        <div className="scrim-x absolute -inset-px" />
        <div className="scrim-y absolute -inset-px" />
      </div>

      <div className="shell flex min-h-[calc(100svh-var(--nav-h)-116px)] items-center py-12 lg:min-h-[min(calc(100svh-var(--nav-h)-116px),860px)] lg:py-14">
        <div>
          <h1
            id="hero-title"
            className="font-display text-[length:var(--text-hero)] leading-[0.9] uppercase lg:whitespace-nowrap"
          >
            <span className="reveal-line" style={line(0)}>
              <span className="mb-[0.3em] block font-label text-[clamp(1.25rem,1.9vw,2rem)] leading-none tracking-[0.14em] text-fg/90">
                Gold&rsquo;s Gym Iloilo
              </span>
            </span>
            <span className="reveal-line text-gold" style={line(1)}>
              <span>Your strongest</span>
            </span>{" "}
            <span className="reveal-line text-fg" style={line(2)}>
              <span>Starts here.</span>
            </span>
          </h1>

          <p
            className="hero-fade mt-6 max-w-[34ch] text-[length:var(--text-body)] text-fg/85"
            style={delay(620)}
          >
            Train with purpose. Build strength. Keep progressing.
          </p>

          <div className="hero-fade mt-8 flex flex-wrap items-center gap-4" style={delay(800)}>
            <DayPassButton />
            <WatchGymButton />
          </div>
        </div>
      </div>
    </section>
  );
}
