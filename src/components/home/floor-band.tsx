import Image from "next/image";
import type { ComponentType, SVGProps } from "react";
import { OpenBadge } from "@/components/hours/open-badge";
import { ButtonLink, buttonClasses } from "@/components/ui/button";
import { ArrowRight, Calendar, Clock, Dumbbell, Globe, MapPin, Sun, Trophy, Users } from "@/components/ui/icons";
import { HOURS, formatMinutes } from "@/lib/hours";
import { ADDRESS } from "@/lib/site";

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

const TRUST: { icon: Icon; label: string }[] = [
  { icon: Dumbbell, label: "Premium Equipment" },
  { icon: Users, label: "Expert Coaches" },
  { icon: Trophy, label: "Supportive Community" },
];

const panelTitle = "font-label text-[1.5rem] leading-none tracking-[0.06em] uppercase";

/**
 * One horizontal band (owner-directed athletic split): an angled floor photo with a gold slash,
 * the pitch with a solid gold CTA and trust row, and a rounded hours + location card.
 */
export function FloorBand() {
  const [streetLine, ...restLines] = ADDRESS.lines;

  return (
    <section
      aria-labelledby="floor-title"
      className="relative isolate overflow-hidden bg-canvas py-[var(--section-y)]"
    >
      {/* Decorative brand watermark behind the right half. Very low opacity so text contrast is unaffected. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 -right-24 -z-10 size-[420px] -translate-y-1/2 opacity-[0.06] select-none lg:right-[-6%] lg:size-[760px]"
      >
        <Image src="/images/gold-logo.png" alt="" width={640} height={637} className="size-full object-contain" />
      </div>

      <div className="shell grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1.1fr)_minmax(0,0.95fr)] lg:items-stretch lg:gap-10">
        {/* Left: floor photo. Rectangular with a gold bottom rule below lg; slanted with a gold slash on lg+. */}
        <div className="group relative aspect-[4/3] border-b-[3px] border-gold sm:aspect-[16/10] lg:aspect-auto lg:min-h-[600px] lg:border-b-0">
          <div className="floor-photo absolute inset-0 overflow-hidden">
            <Image
              src="/images/training-floor.jpg"
              alt="The training floor at Gold's Gym Iloilo: hexagon ceiling lights over dumbbell racks, power racks and benches"
              fill
              sizes="(min-width: 1600px) 640px, (min-width: 1024px) 40vw, 100vw"
              quality={85}
              className="object-cover object-center transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-[1.03]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-canvas/35 via-transparent to-transparent"
            />
          </div>
          <div aria-hidden="true" className="floor-slash absolute inset-0 hidden lg:block" />
          <div aria-hidden="true" className="absolute bottom-0 left-0 hidden h-1 w-28 bg-gold lg:block" />
        </div>

        {/* Center: pitch */}
        <div className="flex flex-col justify-center">
          <p className="font-label text-[1.25rem] leading-none tracking-[0.14em] text-gold uppercase italic">
            The training floor
          </p>
          <h2
            id="floor-title"
            className="mt-4 font-display text-[length:var(--text-display)] leading-[0.92] uppercase italic"
          >
            <span className="block text-fg">Built for</span>
            <span className="block text-gold">Serious work.</span>
          </h2>
          <p className="mt-6 max-w-[52ch] text-[length:var(--text-body)] text-muted">
            Gold&rsquo;s Gym Iloilo is more than a place to work out. It&rsquo;s a community built around
            strength, discipline, and progress. Whether you&rsquo;re starting your fitness journey or pushing
            toward your next personal best, our space is designed to help you become stronger every day.
          </p>
          <ButtonLink href="/why-gold-s-gym" className="mt-8 self-start rounded-full px-7">
            Explore the gym
            <ArrowRight className="size-[1.1em]" />
          </ButtonLink>

          <ul className="mt-10 grid divide-y divide-line-subtle border-y border-line-subtle sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {TRUST.map(({ icon: TrustIcon, label }) => (
              <li
                key={label}
                className="flex items-center gap-3 py-4 sm:flex-col sm:items-start sm:gap-2.5 sm:px-4 sm:py-5 sm:first:pl-0"
              >
                <TrustIcon className="size-7 shrink-0 text-gold" />
                <span className="font-label text-[1.125rem] leading-[1.1] tracking-[0.04em] uppercase">{label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: hours + location card */}
        <div className="flex flex-col justify-between rounded-xl border border-gold/45 bg-elevated/95 p-7 shadow-[inset_0_1px_0_0_var(--border-subtle)]">
          <div>
            <h2 className={`${panelTitle} flex items-center gap-3`}>
              <Clock className="size-6 shrink-0 text-gold" />
              Opening hours
            </h2>
            <OpenBadge className="mt-5" />

            <dl className="mt-6 divide-y divide-line-subtle border-y border-line-subtle">
              {HOURS.map((range) => {
                const RangeIcon = range.days.includes(0) ? Sun : Calendar;
                return (
                  <div key={range.label} className="flex items-start gap-4 py-4">
                    <RangeIcon className="mt-0.5 size-6 shrink-0 text-gold" />
                    <div>
                      <dt className="font-mono text-[0.875rem] text-muted">{range.label}</dt>
                      <dd className="mt-1 font-mono text-[clamp(1.125rem,1.7vw,1.375rem)] leading-tight text-fg tabular-nums">
                        {formatMinutes(range.open)} – {formatMinutes(range.close)}
                      </dd>
                    </div>
                  </div>
                );
              })}
            </dl>
            <p className="mt-3 flex items-center gap-2 font-mono text-[0.8125rem] text-muted">
              <Globe className="size-4 shrink-0 text-gold" />
              Philippine time (Asia/Manila)
            </p>
          </div>

          <div className="mt-8 border-t border-line-subtle pt-7">
            <h2 className={`${panelTitle} flex items-center gap-3`}>
              <MapPin className="size-6 shrink-0 text-gold" />
              Location
            </h2>
            <address className="mt-5 flex gap-3 not-italic">
              <MapPin className="mt-1 size-4 shrink-0 text-gold" />
              <p className="font-mono text-[1rem] leading-relaxed text-fg">
                <span className="block font-bold">{streetLine}</span>
                {restLines.map((line) => (
                  <span key={line} className="block text-fg/90">
                    {line}
                  </span>
                ))}
              </p>
            </address>
            <a
              href={ADDRESS.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses("outline-fill", "md", "mt-6 w-full rounded-lg")}
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
