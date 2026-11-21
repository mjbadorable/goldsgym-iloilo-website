import Image from "next/image";
import { NamedIcon } from "@/components/ui/zone-icons";
import { ZONE_TAGS } from "@/content/zone-tags";
import { ZONES } from "@/content/zones";

/**
 * Four training zones: a header row, then a 2 x 2 grid on tablets and 4 across from xl. Every card
 * is the same height, with its movement keywords pinned to the foot so the weight is even.
 */
export function Zones() {
  return (
    <section aria-labelledby="zones-title" className="shell pt-12 pb-[var(--section-y)] lg:pt-16">
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3 border-b border-line-subtle pb-6 lg:pb-8">
        <h2
          id="zones-title"
          className="font-display text-[length:var(--text-subdisplay)] leading-[1.06] uppercase"
        >
          Four dedicated spaces.
        </h2>
        <p className="font-label text-[1.25rem] leading-none tracking-[0.1em] text-gold uppercase">
          Training zones
        </p>
      </div>

      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:mt-10 xl:grid-cols-4 xl:gap-7">
        {ZONES.map((zone) => (
          <li key={zone.id} id={zone.id} className="flex scroll-mt-24">
            <article className="hairline group flex w-full flex-col bg-surface">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={zone.image.src}
                  alt={zone.image.alt}
                  fill
                  sizes="(min-width: 1280px) 24vw, (min-width: 640px) 50vw, 100vw"
                  quality={85}
                  className="object-cover transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-[1.04]"
                  style={{ objectPosition: zone.image.position }}
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface/70 via-transparent to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-40"
                />
              </div>
              <div className="flex flex-1 flex-col p-6 xl:p-7">
                <span className="inline-flex size-11 shrink-0 items-center justify-center border border-line text-gold transition-colors duration-[var(--dur-fast)] group-hover:border-gold">
                  <NamedIcon name={zone.icon} className="size-6" />
                </span>
                <h3 className="mt-4 font-label text-[1.65rem] leading-none tracking-[0.04em] uppercase">
                  {zone.name}
                </h3>
                <p className="mt-3 max-w-[65ch] text-[0.98rem] leading-relaxed text-muted">{zone.description}</p>
                <div className="mt-auto pt-6">
                  <ul className="flex min-h-[6.5rem] flex-wrap content-start gap-2 border-t border-line-subtle pt-5">
                    {ZONE_TAGS[zone.id]?.map((tag) => (
                      <li key={tag} className="border border-line-subtle px-3 py-1.5 font-mono text-[0.8125rem] text-fg">
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
