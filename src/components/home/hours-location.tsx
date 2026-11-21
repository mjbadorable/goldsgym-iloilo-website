import { OpenBadge } from "@/components/hours/open-badge";
import { buttonClasses } from "@/components/ui/button";
import { ArrowRight, MapPin } from "@/components/ui/icons";
import { HOURS, formatMinutes } from "@/lib/hours";
import { ADDRESS } from "@/lib/site";

const panel = "border border-line bg-elevated p-8 md:p-12";
const panelTitle = "font-label text-[1.75rem] leading-none tracking-[0.06em] uppercase";

export function HoursLocation() {
  return (
    <section aria-label="Opening hours and location" className="border-t border-line-subtle bg-surface">
      <div className="mx-auto grid max-w-[1280px] gap-6 px-6 py-16 md:px-10 lg:grid-cols-2 lg:py-24">
        <div className={panel}>
          <h2 className={panelTitle}>Opening hours</h2>
          <OpenBadge className="mt-6" />

          <dl className="mt-8 divide-y divide-line-subtle border-y border-line-subtle">
            {HOURS.map((range) => (
              <div
                key={range.label}
                className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <dt className="font-mono text-[0.9375rem] text-muted">{range.label}</dt>
                <dd className="font-mono text-[clamp(1.375rem,3.2vw,1.875rem)] leading-tight text-fg tabular-nums">
                  {formatMinutes(range.open)} – {formatMinutes(range.close)}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 font-mono text-[0.8125rem] text-muted">Philippine time (Asia/Manila)</p>
        </div>

        <div className={panel}>
          <h2 className={panelTitle}>Location</h2>
          <address className="mt-8 flex gap-4 not-italic">
            <MapPin className="mt-1 size-7 shrink-0 text-gold" />
            <p className="font-mono text-[clamp(1.125rem,2.4vw,1.5rem)] leading-snug text-fg">
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
            className={buttonClasses("outline", "md", "mt-10")}
          >
            Get directions
            <ArrowRight className="size-[1.1em]" />
            <span className="sr-only">(opens Google Maps in a new tab)</span>
          </a>
        </div>
      </div>
    </section>
  );
}
