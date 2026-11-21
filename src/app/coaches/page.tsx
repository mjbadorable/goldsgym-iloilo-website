import type { Metadata } from "next";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { COACHES } from "@/content/coaches";

export const metadata: Metadata = {
  title: "Coaches",
  description:
    "Meet the coaches at Gold's Gym Iloilo: Andrew Miano, Vincent Loui Dorde and Jerry Perje. Strength, technique, conditioning and accountability.",
  alternates: { canonical: "/coaches" },
};

// Middle card steps down on wide screens so the row has a rhythm instead of a flat line.
const stagger = ["lg:mt-0", "lg:mt-12", "lg:mt-0"];

export default function CoachesPage() {
  return (
    <>
      <section aria-labelledby="coaches-title">
        <div className="mx-auto max-w-[1280px] px-6 pt-12 pb-12 md:px-10 lg:pt-24 lg:pb-16">
          <h1
            id="coaches-title"
            className="max-w-[16ch] font-display text-[clamp(3rem,8.5vw,6rem)] leading-[0.95] uppercase"
          >
            The right guidance can change how you train.
          </h1>
        </div>
      </section>

      <section aria-label="Coaches" className="mx-auto max-w-[1280px] px-6 pb-16 md:px-10 lg:pb-24">
        <ul className="grid gap-6 md:grid-cols-3">
          {COACHES.map((coach, i) => (
            <li key={coach.id} className={cn("flex", stagger[i])}>
              <article className="hairline flex w-full flex-col bg-surface">
                {/* Portraits are 2:3. A 4:5 frame pinned to the top keeps every head and face in view. */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={coach.image.src}
                    alt={coach.image.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    quality={85}
                    className="object-cover object-[50%_12%]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6 md:p-8">
                  <h2 className="font-display text-[clamp(1.75rem,3vw,2.25rem)] leading-[1] uppercase">
                    {coach.name}
                  </h2>
                  <p className="mt-2 text-muted">{coach.role}</p>
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
