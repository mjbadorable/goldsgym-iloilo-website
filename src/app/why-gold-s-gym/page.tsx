import type { Metadata } from "next";
import Image from "next/image";
import type { CSSProperties } from "react";
import { Experience } from "@/components/about/experience";
import { Zones } from "@/components/about/zones";
import { StickySections } from "@/components/ui/sticky-sections";
import { VDivider } from "@/components/ui/v-divider";
import { NamedIcon } from "@/components/ui/zone-icons";
import { ZONES } from "@/content/zones";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata({
  title: "Why Gold's Gym | Training Zones & Gym Equipment in Iloilo",
  description:
    "Explore four dedicated training zones at Gold's Gym Iloilo in Iloilo Business Park: Free Weights, Gym80 Strength, Cardio Bay, and Functional Training with clean facilities and convenient parking.",
  path: "/why-gold-s-gym",
});

export default function AboutPage() {
  return (
    <>
      <section aria-labelledby="about-title" className="relative isolate overflow-hidden">
        {/* Storefront photo sits behind the right side; overflow-hidden clips hero-settle cleanly. */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-0 -z-10 w-full overflow-hidden lg:w-[64%]"
        >
          <Image
            src="/images/storefront-sign.jpg"
            alt=""
            fill
            sizes="(min-width: 1024px) 64vw, 100vw"
            quality={85}
            loading="eager"
            fetchPriority="high"
            className="hero-settle object-cover object-[50%_26%]"
          />
          <div className="absolute inset-0 bg-canvas/70 lg:bg-transparent" />
          <div className="scrim-x absolute -inset-px" />
        </div>

        <div className="shell flex min-h-[300px] items-center py-10 lg:min-h-[clamp(340px,34svh,420px)] lg:py-12">
          <div>
            <h1
              id="about-title"
              className="font-display text-[length:var(--text-hero)] leading-[1.02] uppercase lg:whitespace-nowrap"
            >
              <span className="reveal-line" style={{ "--i": 0 } as CSSProperties}>
                <span>
                  <span className="text-fg">Built to</span> <span className="text-gold">train.</span>
                </span>
              </span>
            </h1>
            <p
              className="hero-fade mt-4 max-w-[38ch] text-[length:var(--text-body)] text-fg/85"
              style={{ "--delay": "420ms" } as CSSProperties}
            >
              A complete training environment with the tools, space, and support you need to reach your goals.
            </p>
            {/* Jump links to the four zone cards below. Smooth scrolling is global (and off under reduced motion). */}
            <nav
              aria-label="Training zones"
              className="hero-fade mt-6"
              style={{ "--delay": "620ms" } as CSSProperties}
            >
              <ul className="flex flex-wrap gap-2">
                {ZONES.map((zone) => (
                  <li key={zone.id}>
                    <a
                      href={`#${zone.id}`}
                      className="inline-flex min-h-11 items-center gap-2.5 border border-line bg-canvas px-4 font-label text-[1.0625rem] leading-none tracking-[0.06em] text-fg uppercase transition-colors duration-[var(--dur-fast)] hover:border-gold hover:text-gold"
                    >
                      <NamedIcon name={zone.icon} className="size-4 shrink-0 text-gold" />
                      {zone.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </section>

      <VDivider />
      <StickySections ids={["training-zones", "gym-experience"]}>
        <Zones />
        <VDivider />
        <Experience />
      </StickySections>
    </>
  );
}
