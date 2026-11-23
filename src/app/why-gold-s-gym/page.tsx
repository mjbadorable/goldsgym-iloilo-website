import type { Metadata } from "next";
import Image from "next/image";
import type { CSSProperties } from "react";
import { Experience } from "@/components/about/experience";
import { Zones } from "@/components/about/zones";
import { StickySections } from "@/components/ui/sticky-sections";
import { VDivider } from "@/components/ui/v-divider";
import { ZONES } from "@/content/zones";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata({
  title: "Why Gold's Gym",
  description:
    "Four training zones under one roof: Free Weights, Gym80 Strength, Cardio Bay and Functional Training, plus clean facilities, easy parking and quality equipment.",
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
              className="page-reveal font-display text-[length:var(--text-hero)] leading-[1.02] uppercase lg:whitespace-nowrap"
              style={{ "--delay": "40ms" } as CSSProperties}
            >
              <span className="text-fg">Built to</span> <span className="text-gold">train.</span>
            </h1>
            <p
              className="page-reveal mt-4 max-w-[38ch] text-[length:var(--text-body)] text-fg/85"
              style={{ "--delay": "130ms" } as CSSProperties}
            >
              A complete training environment with the tools, space, and support you need to reach your goals.
            </p>
            {/* Jump links to the four zone cards below. Smooth scrolling is global (and off under reduced motion). */}
            <nav
              aria-label="Training zones"
              className="page-reveal mt-6"
              style={{ "--delay": "210ms" } as CSSProperties}
            >
              <ul className="flex flex-wrap gap-2">
                {ZONES.map((zone) => (
                  <li key={zone.id}>
                    <a
                      href={`#${zone.id}`}
                      className="inline-flex min-h-11 items-center border border-line bg-canvas px-4 font-mono text-[0.8125rem] text-fg transition-colors duration-[var(--dur-fast)] hover:border-gold hover:text-gold"
                    >
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
