import Image from "next/image";
import { cn } from "@/lib/cn";
import { ZONES, type Zone } from "@/content/zones";

function ZoneTags({ tags }: { tags: string[] }) {
  return (
    <ul className="mt-6 flex flex-wrap gap-2" aria-label="Includes">
      {tags.map((tag) => (
        <li key={tag} className="border border-line-subtle px-3 py-1.5 font-mono text-[0.8125rem] text-fg">
          {tag}
        </li>
      ))}
    </ul>
  );
}

function ZoneRow({ zone, flip }: { zone: Zone; flip: boolean }) {
  const { image } = zone;
  return (
    <article
      id={zone.id}
      aria-labelledby={`${zone.id}-title`}
      className="grid scroll-mt-24 gap-8 border-t border-line-subtle py-12 first:border-t-0 lg:grid-cols-12 lg:items-center lg:gap-8 lg:py-20"
    >
      {image ? (
        <div className={cn("lg:col-span-5 lg:row-start-1", flip ? "lg:col-start-8" : "lg:col-start-1")}>
          <div className="hairline">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                quality={85}
                className="object-cover"
                style={image.position ? { objectPosition: image.position } : undefined}
              />
            </div>
          </div>
        </div>
      ) : null}

      <div
        className={cn(
          "lg:row-start-1",
          image
            ? cn("lg:col-span-6", flip ? "lg:col-start-1" : "lg:col-start-7")
            : "lg:col-span-9 lg:col-start-1",
        )}
      >
        <h3
          id={`${zone.id}-title`}
          className="font-display text-[clamp(2.25rem,5.5vw,4rem)] leading-[0.95] uppercase"
        >
          {zone.name}
        </h3>
        <p className="mt-5 max-w-[56ch] text-[1.125rem] text-muted">{zone.description}</p>
        <ZoneTags tags={zone.tags} />
      </div>
    </article>
  );
}

export function Zones() {
  // `flip` alternates only across rows that have a photo, so text and image sides keep alternating.
  let photoIndex = 0;
  return (
    <section aria-label="Training zones" className="mx-auto max-w-[1280px] px-6 md:px-10">
      {ZONES.map((zone) => {
        const flip = zone.image ? photoIndex++ % 2 === 1 : false;
        return <ZoneRow key={zone.id} zone={zone} flip={flip} />;
      })}
    </section>
  );
}
