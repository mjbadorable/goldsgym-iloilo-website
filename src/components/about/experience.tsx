import Image from "next/image";
import { cn } from "@/lib/cn";
import { EXPERIENCES } from "@/content/zones";

// On wide screens the cards step down left to right, like plates on a bar.
const stagger = ["lg:mt-0", "lg:mt-12", "lg:mt-24"];

export function Experience() {
  return (
    <section aria-labelledby="experience-title" className="mx-auto max-w-[1280px] px-6 py-16 md:px-10 lg:py-24">
      <div className="max-w-[40rem]">
        <h2
          id="experience-title"
          className="font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] uppercase"
        >
          The Gym Experience
        </h2>
        <p className="mt-5 text-[1.125rem] text-muted">Everything you need to train comfortably.</p>
      </div>

      <ul className="mt-12 grid gap-6 md:grid-cols-3 lg:mt-16">
        {EXPERIENCES.map((item, i) => (
          <li key={item.id} className={cn("flex", stagger[i])}>
            <article className="hairline flex w-full flex-col bg-surface">
              <div className="relative aspect-[5/4] overflow-hidden">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  quality={85}
                  className="object-cover"
                />
              </div>
              <div className="flex-1 p-6 md:p-8">
                <h3 className="font-label text-[1.75rem] leading-none tracking-[0.04em] uppercase">
                  {item.title}
                </h3>
                <p className="mt-4 text-muted">{item.description}</p>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
