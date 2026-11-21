import Image from "next/image";
import { NamedIcon } from "@/components/ui/zone-icons";
import { EXPERIENCES } from "@/content/zones";

/** Enlarged Gym Experience section: bold editorial heading over 3 responsive dynamic facility cards. */
export function Experience() {
  return (
    <section aria-label="The Gym Experience" className="border-t border-line-subtle bg-surface">
      <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-10 lg:py-28">
        <div className="max-w-[46rem]">
          <h2 className="font-display text-[clamp(2.5rem,5vw,4.25rem)] leading-[0.96] uppercase">
            Everything you need to train comfortably.
          </h2>
        </div>

        <ul className="mt-10 grid gap-6 md:grid-cols-3 lg:mt-14 lg:gap-7">
          {EXPERIENCES.map((item) => (
            <li key={item.id} className="flex">
              <article className="hairline group flex w-full flex-col bg-canvas">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    sizes="(min-width: 1024px) 32vw, (min-width: 768px) 33vw, 100vw"
                    quality={88}
                    className="object-cover transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-[1.05]"
                    style={{ objectPosition: item.image.position }}
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-canvas/70 via-transparent to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-40"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6 lg:p-8">
                  <div className="flex items-center gap-3.5">
                    <span className="inline-flex size-11 shrink-0 items-center justify-center border border-line text-gold transition-colors duration-[var(--dur-fast)] group-hover:border-gold">
                      <NamedIcon name={item.icon} className="size-6" />
                    </span>
                    <h3 className="font-label text-[1.65rem] leading-[1.02] tracking-[0.04em] uppercase">
                      {item.title}
                    </h3>
                  </div>
                  <p className="mt-4 text-[1rem] leading-relaxed text-muted">{item.description}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
