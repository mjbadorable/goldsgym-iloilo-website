import type { Metadata } from "next";
import Image from "next/image";
import { Accordion } from "@/components/faq/accordion";
import { Stars } from "@/components/reviews/stars";
import { SplitHeader } from "@/components/ui/split-header";
import { StickyBar, StickySections } from "@/components/ui/sticky-sections";
import { FAQ } from "@/content/faq";
import { REVIEWS } from "@/content/reviews";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata({
  title: "Reviews + FAQ",
  description:
    "What members say about Gold's Gym Iloilo on Google, and answers to the questions everyone asks before a first visit.",
  path: "/reviews-faq",
});

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
          title="The floor is only part of the experience."
          intro="Members say it better than we can. These are verified five-star reviews from Google."
        />

        <section id="member-reviews" aria-labelledby="reviews-list-title" className="pb-[var(--section-y)]">
          <StickyBar as="h2" id="reviews-list-title" sectionId="member-reviews">
            Member reviews
          </StickyBar>
          <ul className="shell mt-8 grid gap-6 lg:grid-cols-3">
            {REVIEWS.map((review) => (
              <li key={review.id} className="flex">
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
        <div className="shell grid gap-12 pt-10 pb-[var(--section-y)] lg:grid-cols-12 lg:gap-8 lg:pt-14">
          <div className="lg:col-span-5">
            <h2
              id="faq-title"
              className="font-display text-[length:var(--text-display)] leading-[1.06] uppercase"
            >
              Here&rsquo;s what a first visit looks like.
            </h2>
            <p className="mt-6 max-w-[38ch] text-muted">
              The questions everyone asks before walking in for the first time are answered, so there&rsquo;s
              nothing to figure out on the day.
            </p>
            <div
              aria-hidden="true"
              className="relative mt-8 hidden aspect-square w-full max-w-[420px] overflow-hidden opacity-85 [mask-image:radial-gradient(closest-side,black_60%,transparent)] lg:block"
            >
              <Image
                src="/images/golds-mesh-emblem.jpg"
                alt=""
                fill
                sizes="420px"
                quality={85}
                className="object-cover object-center"
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <Accordion items={FAQ} defaultOpenId={FAQ[0].id} />
          </div>
        </div>
      </section>
    </StickySections>
  );
}
