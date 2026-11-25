import type { Metadata } from "next";
import Image from "next/image";
import type { CSSProperties } from "react";
import { DayPassButton } from "@/components/day-pass/day-pass-button";
import { Accordion } from "@/components/faq/accordion";
import { HashReveal } from "@/components/faq/hash-reveal";
import { Stars } from "@/components/reviews/stars";
import { Phone } from "@/components/ui/icons";
import { SplitHeader } from "@/components/ui/split-header";
import { StickyBar, StickySections } from "@/components/ui/sticky-sections";
import { FAQ } from "@/content/faq";
import { REVIEWS } from "@/content/reviews";
import { PAGE_SEO } from "@/content/seo";
import { pageMetadata } from "@/lib/page-metadata";
import { CONTACT } from "@/lib/site";

export const metadata: Metadata = pageMetadata(PAGE_SEO.reviews);

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.plainAnswer,
    },
  })),
};

export default function ReviewsFaqPage() {
  return (
    <StickySections ids={["member-reviews", "faq"]}>
      <div className="relative isolate overflow-x-clip">
        {/* Ambient backdrop: a dark black-and-white lifting shot, faded into the canvas. */}
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <Image
            src="/images/incline-press-bw.jpg"
            alt=""
            fill
            sizes="100vw"
            quality={75}
            loading="eager"
            className="object-cover object-[50%_35%] opacity-25"
          />
          <div className="scrim-y absolute inset-0" />
          <div className="absolute inset-0 bg-canvas/60" />
        </div>

        <SplitHeader
          id="reviews-title"
          title={
            <>
              The floor is only part of <span className="text-gold">the experience.</span>
            </>
          }
          intro="Members say it better than we can. These are verified five-star reviews from Google."
        />

        <section id="member-reviews" aria-labelledby="reviews-list-title" className="pb-[var(--section-y)]">
          <StickyBar as="h2" id="reviews-list-title" sectionId="member-reviews">
            Member reviews
          </StickyBar>
          <ul className="shell mt-8 grid gap-6 lg:grid-cols-3">
            {REVIEWS.map((review, i) => (
              <li
                key={review.id}
                className="deck-reveal flex"
                style={{ "--delay": `${480 + i * 160}ms` } as CSSProperties}
              >
                <figure className="hairline flex w-full flex-col justify-between gap-10 border bg-surface p-8">
                  <div>
                    <Stars />
                    <blockquote className="mt-6 text-[1.25rem] leading-snug font-medium text-fg">
                      <p>&ldquo;{review.quote}&rdquo;</p>
                    </blockquote>
                  </div>
                  <figcaption className="flex items-center gap-4">
                    <span
                      aria-hidden="true"
                      className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-line bg-elevated font-label text-[1.375rem] leading-none text-gold"
                    >
                      {review.author.charAt(0)}
                    </span>
                    <span>
                      <span className="block font-label text-[1.375rem] leading-none tracking-[0.04em] uppercase">
                        {review.author}
                      </span>
                      <span className="mt-1.5 block font-mono text-[0.8125rem] text-muted">
                        {review.source}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section
        id="faq"
        aria-labelledby="faq-title"
        className="relative isolate overflow-x-clip border-t border-line-subtle bg-surface"
      >
        <StickyBar sectionId="faq">First visit FAQ</StickyBar>
        <div className="shell grid gap-10 pt-10 pb-14 lg:grid-cols-12 lg:items-start lg:gap-8 lg:pt-14 lg:pb-16">
          <HashReveal className="lg:col-span-5" delayMs={960} hashDelayMs={0}>
            <h2
              id="faq-title"
              className="font-display text-[length:var(--text-display)] leading-[1.06] uppercase"
            >
              Here&rsquo;s what a <span className="text-gold">first visit looks like.</span>
            </h2>
            <p className="mt-5 max-w-[38ch] text-muted">
              The questions everyone asks before walking in for the first time are answered, so there&rsquo;s
              nothing to figure out on the day.
            </p>
            <div className="mt-8 max-w-[38ch] border border-line-subtle bg-elevated/70 p-6">
              <h3 className="flex items-center gap-2.5 font-label text-[1.25rem] leading-none tracking-[0.08em] text-fg uppercase before:h-4 before:w-[3px] before:shrink-0 before:bg-gold">
                Still have questions?
              </h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                Reach our front desk directly or send us a message to schedule your visit.
              </p>
              <a
                href={`tel:${CONTACT.phoneE164}`}
                className="mt-4 inline-flex items-center gap-2.5 text-[0.9375rem] font-medium text-fg tabular-nums transition-colors duration-[160ms] hover:text-gold"
              >
                <Phone className="size-4 shrink-0 text-gold" />
                {CONTACT.phoneDisplay}
              </a>
              <DayPassButton size="sm" className="mt-5 w-full">
                Contact us
              </DayPassButton>
            </div>
          </HashReveal>

          <HashReveal className="lg:col-span-7" delayMs={1120} hashDelayMs={140}>
            <Accordion items={FAQ} defaultOpenId={FAQ[0].id} />
          </HashReveal>
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }}
      />
    </StickySections>
  );
}
