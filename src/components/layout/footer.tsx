import Image from "next/image";
import Link from "next/link";
import { DayPassButton } from "@/components/day-pass/day-pass-button";
import { Mail, Phone } from "@/components/ui/icons";
import { VDivider } from "@/components/ui/v-divider";
import { ADDRESS, CONTACT, FOOTER_LINKS, SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-auto bg-surface">
      <VDivider />
      <div className="mx-auto grid max-w-[1280px] gap-16 px-6 pt-16 pb-12 md:px-10 lg:grid-cols-12 lg:gap-8 lg:pt-24">
        <div className="lg:col-span-6">
          <h2 className="font-display text-[clamp(3rem,6vw,4.5rem)] leading-[0.95] uppercase">
            <span className="text-gold">Your strongest</span>
            <br />
            <span className="text-fg">starts here.</span>
          </h2>
          <p className="mt-6 max-w-[44ch] text-lg text-muted">
            Train with purpose. Build strength. Keep progressing.
          </p>
          <DayPassButton className="mt-8" />
        </div>

        <div className="grid gap-12 sm:grid-cols-[8rem_1fr] lg:col-span-6 lg:pl-8">
          <nav aria-label="Quick links">
            <h3 className="font-label text-[1.25rem] leading-none tracking-[0.06em] uppercase">Quick links</h3>
            <ul className="mt-5 space-y-3">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="link-underline text-muted hover:text-fg">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="font-label text-[1.25rem] leading-none tracking-[0.06em] uppercase">Contact us</h3>
            <ul className="mt-5 space-y-4 font-mono text-[0.9375rem]">
              <li>
                <a
                  href={`tel:${CONTACT.phoneE164}`}
                  className="flex items-center gap-3 text-fg transition-colors duration-[160ms] hover:text-gold"
                >
                  <Phone className="size-5 shrink-0 text-gold" />
                  {CONTACT.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-start gap-3 text-fg transition-colors duration-[160ms] hover:text-gold"
                >
                  <Mail className="mt-0.5 size-5 shrink-0 text-gold" />
                  <span className="text-[0.875rem] [overflow-wrap:anywhere]">{CONTACT.email}</span>
                </a>
              </li>
            </ul>
            <address className="mt-6 font-mono text-[0.875rem] leading-relaxed text-muted not-italic">
              {ADDRESS.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </div>
        </div>
      </div>

      <div className="border-t border-line-subtle">
        <div className="mx-auto flex max-w-[1280px] items-center gap-3 px-6 py-6 md:px-10">
          <Image src="/images/gold-logo.png" alt="" width={24} height={24} className="size-6" />
          <p className="text-sm text-muted">&copy; {SITE.name}</p>
        </div>
      </div>
    </footer>
  );
}
