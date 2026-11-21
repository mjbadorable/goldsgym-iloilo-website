import Image from "next/image";
import { NamedIcon } from "@/components/ui/zone-icons";
import { ZONES } from "@/content/zones";

/** Four training zones side by side on wide screens; each has a real 16:10 photo. */
export function Zones() {
  return (
    <section aria-labelledby="zones-title" className="mx-auto max-w-[1280px] px-6 py-16 md:px-10 lg:py-24">
      <h2 id="zones-title" className="sr-only">
        Training zones
      </h2>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {ZONES.map((zone) => (
          <li key={zone.id} id={zone.id} className="flex scroll-mt-24">
            <article className="hairline flex w-full flex-col bg-surface">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={zone.image.src}
                  alt={zone.image.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  quality={85}
                  className="object-cover"
                  style={{ objectPosition: zone.image.position }}
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-10 shrink-0 items-center justify-center border border-line text-gold">
                    <NamedIcon name={zone.icon} className="size-6" />
                  </span>
                  <h3 className="font-label text-[1.5rem] leading-none tracking-[0.04em] uppercase">
                    {zone.name}
                  </h3>
                </div>
                <p className="mt-4 text-[0.9375rem] text-muted">{zone.description}</p>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
