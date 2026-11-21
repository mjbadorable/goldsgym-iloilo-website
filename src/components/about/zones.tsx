import Image from "next/image";
import { NamedIcon } from "@/components/ui/zone-icons";
import { ZONES } from "@/content/zones";

/** Four training zones side by side on wide screens; enlarged responsive photos with subtle hover motion. */
export function Zones() {
  return (
    <section aria-labelledby="zones-title" className="mx-auto max-w-[1440px] px-6 py-16 md:px-10 lg:py-28">
      <h2 id="zones-title" className="sr-only">
        Training zones
      </h2>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
        {ZONES.map((zone) => (
          <li key={zone.id} id={zone.id} className="flex scroll-mt-24">
            <article className="hairline group flex w-full flex-col bg-surface">
              <div className="relative aspect-[4/3] overflow-hidden lg:aspect-[5/4]">
                <Image
                  src={zone.image.src}
                  alt={zone.image.alt}
                  fill
                  sizes="(min-width: 1280px) 24vw, (min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  quality={88}
                  className="object-cover transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-[1.05]"
                  style={{ objectPosition: zone.image.position }}
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface/70 via-transparent to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-40"
                />
              </div>
              <div className="flex flex-1 flex-col p-6 lg:p-7">
                <div className="flex items-center gap-3.5">
                  <span className="inline-flex size-11 shrink-0 items-center justify-center border border-line text-gold transition-colors duration-[var(--dur-fast)] group-hover:border-gold">
                    <NamedIcon name={zone.icon} className="size-6" />
                  </span>
                  <h3 className="font-label text-[1.65rem] leading-none tracking-[0.04em] uppercase">
                    {zone.name}
                  </h3>
                </div>
                <p className="mt-4 text-[0.98rem] leading-relaxed text-muted">{zone.description}</p>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
