import Image from "next/image";
import { NamedIcon } from "@/components/ui/zone-icons";
import { EXPERIENCES } from "@/content/zones";

/** Heading on the left, a three-up strip of facility highlights on the right. */
export function Experience() {
  return (
    <section aria-label="The Gym Experience" className="border-t border-line-subtle bg-surface">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-6 py-16 md:px-10 lg:grid-cols-12 lg:gap-8 lg:py-24">
        <div className="lg:col-span-4">
          <h2 className="font-display text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[0.98] uppercase">
            Everything you need to train comfortably.
          </h2>
        </div>

        <ul className="grid gap-px border border-line-subtle bg-line-subtle lg:col-span-8 lg:grid-cols-3">
          {EXPERIENCES.map((item) => (
            <li key={item.id} className="flex bg-canvas">
              <article className="flex w-full flex-col sm:flex-row lg:flex-col">
                <div className="relative aspect-[16/10] shrink-0 overflow-hidden sm:aspect-auto sm:w-2/5 lg:aspect-[16/10] lg:w-full">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    sizes="(min-width: 1024px) 22vw, (min-width: 640px) 40vw, 100vw"
                    quality={85}
                    className="object-cover"
                    style={{ objectPosition: item.image.position }}
                  />
                </div>
                <div className="flex-1 p-6">
                  <div className="flex items-center gap-3">
                    <NamedIcon name={item.icon} className="size-7 shrink-0 text-gold" />
                    <h3 className="font-label text-[1.375rem] leading-[1.05] tracking-[0.04em] uppercase">
                      {item.title}
                    </h3>
                  </div>
                  <p className="mt-4 text-[0.9375rem] text-muted">{item.description}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
