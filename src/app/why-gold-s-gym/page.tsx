import type { Metadata } from "next";
import { Experience } from "@/components/about/experience";
import { Zones } from "@/components/about/zones";
import { VDivider } from "@/components/ui/v-divider";
import { ZONES } from "@/content/zones";

export const metadata: Metadata = {
  title: "Why Gold's Gym",
  description:
    "Four training zones under one roof: Free Weights, Gym80 Strength, Cardio Bay and Functional Training, plus clean facilities, easy parking and quality equipment.",
  alternates: { canonical: "/why-gold-s-gym" },
};

export default function AboutPage() {
  return (
    <>
      <section aria-labelledby="about-title">
        <div className="mx-auto grid max-w-[1280px] items-end gap-10 px-6 pt-12 pb-16 md:px-10 lg:grid-cols-12 lg:gap-8 lg:pt-24 lg:pb-24">
          <h1
            id="about-title"
            className="font-display text-[clamp(3.5rem,11vw,6rem)] leading-[0.95] uppercase lg:col-span-7"
          >
            Built to train.
          </h1>

          <nav aria-label="Jump to a training zone" className="lg:col-span-4 lg:col-start-9">
            <ul className="border-t border-line-subtle">
              {ZONES.map((zone) => (
                <li key={zone.id} className="border-b border-line-subtle">
                  <a
                    href={`#${zone.id}`}
                    className="flex min-h-12 items-center justify-between gap-4 font-label text-[1.375rem] tracking-[0.06em] uppercase transition-colors duration-[160ms] hover:text-gold"
                  >
                    {zone.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      <VDivider />
      <Zones />
      <VDivider />
      <Experience />
    </>
  );
}
