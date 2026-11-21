import type { Metadata } from "next";
import Image from "next/image";
import { SplitHeader } from "@/components/ui/split-header";
import { COACHES } from "@/content/coaches";

export const metadata: Metadata = {
  title: "Coaches",
  description:
    "Meet the coaches at Gold's Gym Iloilo: Andrew Miano, Vincent Loui Dorde and Jerry Perje. Strength, technique, conditioning and accountability.",
  alternates: { canonical: "/coaches" },
};

export default function CoachesPage() {
  return (
    <>
      <SplitHeader
        id="coaches-title"
        title="The right guidance can change how you train."
        intro="Meet our certified fitness coaches. Whether you're building strength, improving performance, or starting your fitness journey, we're here to guide you."
      />

      <section aria-label="Coaches" className="mx-auto max-w-[1280px] px-6 pb-16 md:px-10 lg:pb-24">
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {COACHES.map((coach) => (
            <li key={coach.id} className="flex">
              <article className="hairline hairline-gold flex w-full flex-col bg-surface">
                {/* Portraits are 2:3. A 4:5 frame pinned to the top keeps every head and face in view. */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={coach.image.src}
                    alt={coach.image.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    quality={85}
                    className="object-cover object-top"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6 md:p-8">
                  <h2 className="font-display text-[clamp(1.75rem,3vw,2.25rem)] leading-[1] uppercase">
                    {coach.name}
                  </h2>
                  <p className="mt-3 font-label text-[1.25rem] leading-none tracking-[0.1em] text-gold uppercase">
                    {coach.role}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2" aria-label="Specialties">
                    {coach.specialties.map((s) => (
                      <li
                        key={s}
                        className="border border-line-subtle px-3 py-1.5 font-mono text-[0.8125rem] text-fg"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
