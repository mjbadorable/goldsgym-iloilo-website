import Image from "next/image";
import Link from "next/link";
import { DayPassButton } from "@/components/day-pass/day-pass-button";
import {
  ChevronRight,
  Dumbbell,
  HelpCircle,
  Home,
  Info,
  Mail,
  MapPin,
  Phone,
} from "@/components/ui/icons";
import { VDivider } from "@/components/ui/v-divider";
import { ADDRESS, CONTACT, FOOTER_LINKS, SITE } from "@/lib/site";

const headingClass =
  "flex items-center gap-2.5 font-label text-[1.375rem] leading-none tracking-[0.08em] text-fg uppercase before:h-4 before:w-[3px] before:shrink-0 before:bg-gold";

const contactBadgeClass =
  "flex size-9 shrink-0 items-center justify-center rounded-full bg-gold text-canvas transition-transform duration-[160ms] group-hover:scale-105";

function QuickLinkIcon({ href }: { href: string }) {
  const cls = "size-5 shrink-0 text-gold";
  if (href === "/") return <Home className={cls} />;
  if (href.startsWith("/why-gold-s-gym")) return <Info className={cls} />;
  if (href.startsWith("/coaches")) return <Dumbbell className={cls} />;
  return <HelpCircle className={cls} />;
}

export function Footer() {
  return (
    <footer className="mt-auto bg-surface">
      <VDivider />
      <div className="shell grid gap-10 pt-6 pb-10 lg:grid-cols-[1.25fr_0.85fr_1.15fr] lg:items-start lg:gap-0 lg:pt-8 lg:pb-11">
        {/* Brand CTA column */}
        <div className="lg:pr-10">
          <h2 className="flex flex-col gap-1 font-display text-[length:var(--text-display)] leading-[1.02] uppercase">
            <span className="text-gold">Your strongest</span>
            <span className="text-fg">starts here.</span>
          </h2>
          <p className="mt-4 max-w-[40ch] text-[length:var(--text-body)] text-muted">
            Train with purpose. Build strength. Keep progressing.
          </p>
          <span aria-hidden="true" className="mt-3 block h-0.5 w-16 bg-gold" />
          <DayPassButton className="mt-5" />
        </div>

        {/* Quick links with gold icons */}
        <nav aria-label="Quick links" className="lg:border-l lg:border-line-subtle lg:px-10">
          <h3 className={headingClass}>Quick links</h3>
          <ul className="mt-4 space-y-1">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group flex min-h-9 items-center justify-between gap-3 py-1 text-[0.9375rem] text-muted transition-colors duration-[160ms] hover:text-fg"
                >
                  <span className="flex items-center gap-3.5">
                    <QuickLinkIcon href={link.href} />
                    <span>{link.label}</span>
                  </span>
                  <ChevronRight className="size-4 text-muted/70 transition-transform duration-[160ms] group-hover:translate-x-0.5 group-hover:text-gold" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact us with solid gold circle icon badges */}
        <div className="lg:border-l lg:border-line-subtle lg:pl-10">
          <h3 className={headingClass}>Contact us</h3>
          <ul className="mt-4 space-y-3.5">
            <li>
              <a
                href={`tel:${CONTACT.phoneE164}`}
                className="group flex items-center gap-3.5 text-[0.9375rem] font-medium text-fg tabular-nums transition-colors duration-[160ms] hover:text-gold"
              >
                <span className={contactBadgeClass}>
                  <Phone className="size-[18px]" strokeWidth={2} />
                </span>
                <span>{CONTACT.phoneDisplay}</span>
              </a>
            </li>
            <li>
              <a
                href={`mailto:${CONTACT.email}`}
                className="group flex items-center gap-3.5 text-[0.9375rem] text-fg transition-colors duration-[160ms] hover:text-gold"
              >
                <span className={contactBadgeClass}>
                  <Mail className="size-[18px]" strokeWidth={2} />
                </span>
                <span className="[overflow-wrap:anywhere]">{CONTACT.email}</span>
              </a>
            </li>
            <li>
              <a
                href={ADDRESS.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3.5 text-[0.9375rem] leading-relaxed text-muted transition-colors duration-[160ms] hover:text-fg"
              >
                <span className={`${contactBadgeClass} mt-0.5`}>
                  <MapPin className="size-[18px]" strokeWidth={2} />
                </span>
                <address className="max-w-[40ch] not-italic">{ADDRESS.oneLine}</address>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom legal & brand pillars bar */}
      <div className="border-t border-gold/30">
        <div className="shell flex flex-col items-start justify-between gap-4 py-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <Image src="/images/gold-logo.png" alt="" width={28} height={28} className="size-7" />
            <p className="text-sm text-muted">&copy; {SITE.name}. All rights reserved.</p>
          </div>
          <p className="flex items-center gap-3 font-label text-[0.9375rem] tracking-[0.14em] text-muted uppercase">
            <span>Strength</span>
            <span aria-hidden="true" className="text-gold">
              |
            </span>
            <span>Fitness</span>
            <span aria-hidden="true" className="text-gold">
              |
            </span>
            <span>Wellness</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
