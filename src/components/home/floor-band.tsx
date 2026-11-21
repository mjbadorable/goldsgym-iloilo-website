import Image from "next/image";
import { OpenBadge } from "@/components/hours/open-badge";
import { ButtonLink, buttonClasses } from "@/components/ui/button";
import { ArrowRight, MapPin } from "@/components/ui/icons";
import { HOURS, formatMinutes } from "@/lib/hours";
import { ADDRESS } from "@/lib/site";

const panelTitle = "font-label text-[1.5rem] leading-none tracking-[0.06em] uppercase";

/** One horizontal band: framed floor photo, the pitch, and full-width practical details (hours + location). */
export function FloorBand() {
  return (
    <section aria-labelledby="floor-title" className="mx-auto w-full max-w-[1680px] px-6 py-16 md:px-10 lg:px-12 lg:py-24">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)_minmax(0,1.15fr)] lg:items-stretch lg:gap-10">
        <div className="group relative aspect-[4/3] overflow-hidden border border-line sm:aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[560px]">
          <Image
            src="/images/training-floor.jpg"
            alt="The training floor at Gold's Gym Iloilo: hexagon ceiling lights over dumbbell racks, power racks and benches"
            fill
            sizes="(min-width: 1024px) 38vw, 100vw"
            quality={88}
            className="object-cover object-center transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-[1.04]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-canvas/35 via-transparent to-transparent"
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="font-label text-[1.25rem] leading-none tracking-[0.14em] text-gold uppercase">
            The training floor
          </p>
          <h2
            id="floor-title"
            className="mt-4 font-display text-[clamp(2.5rem,5vw,3.75rem)] leading-[0.95] uppercase"
          >
            Built for serious work.
          </h2>
          <p className="mt-6 max-w-[52ch] text-[1.0625rem] text-muted">
            Gold&rsquo;s Gym Iloilo is more than a place to work out. It&rsquo;s a community built around
            strength, discipline, and progress. Whether you&rsquo;re starting your fitness journey or pushing
            toward your next personal best, our space is designed to help you become stronger every day.
          </p>
          <ButtonLink href="/why-gold-s-gym" variant="outline" className="mt-8 self-start">
            Explore the gym
            <ArrowRight className="size-[1.1em]" />
          </ButtonLink>
        </div>

        <div className="flex flex-col justify-between border border-line bg-elevated p-8 lg:p-10">
          <div>
            <h2 className={panelTitle}>Opening hours</h2>
            <OpenBadge className="mt-5" />
            <dl className="mt-6 divide-y divide-line-subtle border-y border-line-subtle">
              {HOURS.map((range) => (
                <div key={range.label} className="py-4">
                  <dt className="font-mono text-[0.875rem] text-muted">{range.label}</dt>
                  <dd className="mt-1 font-mono text-[clamp(1.25rem,1.9vw,1.5rem)] leading-tight text-fg tabular-nums">
                    {formatMinutes(range.open)} – {formatMinutes(range.close)}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 font-mono text-[0.8125rem] text-muted">Philippine time (Asia/Manila)</p>
          </div>

          <div className="mt-10 border-t border-line-subtle pt-8">
            <h2 className={panelTitle}>Location</h2>
            <address className="mt-5 flex gap-3.5 not-italic">
              <MapPin className="mt-1 size-6 shrink-0 text-gold" />
              <p className="font-mono text-[1.0625rem] leading-relaxed text-fg">
                {ADDRESS.lines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </p>
            </address>
            <a
              href={ADDRESS.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses("outline", "md", "mt-6 w-full justify-center sm:w-auto")}
            >
              Get directions
              <ArrowRight className="size-[1.1em]" />
              <span className="sr-only">(opens Google Maps in a new tab)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
