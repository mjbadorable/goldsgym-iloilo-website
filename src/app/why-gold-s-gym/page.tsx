import type { Metadata } from "next";
import Image from "next/image";
import { Experience } from "@/components/about/experience";
import { Zones } from "@/components/about/zones";
import { VDivider } from "@/components/ui/v-divider";
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
        <div aria-hidden="true" className="absolute inset-y-0 right-0 -z-10 w-full overflow-hidden lg:w-[64%]">
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

        <div className="shell flex min-h-[420px] items-center py-12 lg:min-h-[clamp(520px,42svh,640px)]">
          <div>
            <h1
              id="about-title"
              className="font-display text-[length:var(--text-hero)] leading-[0.9] uppercase lg:whitespace-nowrap"
            >
              Built to train.
            </h1>
            <p className="mt-6 max-w-[38ch] text-[length:var(--text-body)] text-fg/85">
              A complete training environment with the tools, space, and support you need to reach your goals.
            </p>
          </div>
        </div>
      </section>

      <VDivider />
      <Zones />
      <VDivider />
      <Experience />
    </>
  );
}
