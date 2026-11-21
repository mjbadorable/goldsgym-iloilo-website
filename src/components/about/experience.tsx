import Image from "next/image";
import { StickyBar } from "@/components/ui/sticky-sections";
import { NamedIcon } from "@/components/ui/zone-icons";
import { EXPERIENCES } from "@/content/zones";

/** The Gym Experience: a split header (headline left, lead with a gold rule right) over 3 equal facility cards. */
export function Experience() {
  return (
    <section
      id="gym-experience"
      aria-labelledby="experience-title"
      className="border-t border-line-subtle bg-surface"
    >
      <StickyBar sectionId="gym-experience">The gym experience</StickyBar>
      <div className="shell pt-10 pb-10 lg:pt-14 lg:pb-12">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-8">
          <h2
            id="experience-title"
            className="font-display text-[length:var(--text-display)] leading-[1.06] uppercase lg:col-span-7"
          >
            Everything you need to train comfortably.
          </h2>
          <div className="relative pl-6 lg:col-span-4 lg:col-start-9">
            <span aria-hidden="true" className="absolute inset-y-0 left-0 w-0.5 bg-gold" />
            <p className="max-w-[44ch] text-[length:var(--text-body)] text-fg/85">
              Clean facilities, convenient parking and quality equipment, set up so every visit is comfortable
              from warm-up to cooldown.
            </p>
          </div>
        </div>

        <ul className="mt-10 grid gap-6 lg:mt-12 lg:grid-cols-3 lg:gap-7">
          {EXPERIENCES.map((item) => (
            <li key={item.id} className="flex">
              <article className="hairline group flex w-full flex-col bg-canvas md:max-lg:flex-row">
                <div className="relative aspect-[4/3] overflow-hidden md:max-lg:w-[44%] md:max-lg:shrink-0">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    sizes="(min-width: 1024px) 32vw, (min-width: 768px) 44vw, 100vw"
                    quality={85}
                    className="object-cover transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-[1.04]"
                    style={{ objectPosition: item.image.position }}
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-canvas/70 via-transparent to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-40"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-center p-6 lg:justify-start lg:p-8">
                  <span className="inline-flex size-11 shrink-0 items-center justify-center border border-line text-gold transition-colors duration-[var(--dur-fast)] group-hover:border-gold">
                    <NamedIcon name={item.icon} className="size-6" />
                  </span>
                  <h3 className="mt-4 font-label text-[1.65rem] leading-[1.02] tracking-[0.04em] uppercase lg:max-xl:min-h-[2.04em]">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-[65ch] text-[1rem] leading-relaxed text-muted">
                    {item.description}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
