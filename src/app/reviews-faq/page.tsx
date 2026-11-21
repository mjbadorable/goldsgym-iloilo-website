import type { Metadata } from "next";
import Image from "next/image";
import { Accordion } from "@/components/faq/accordion";
import { Stars } from "@/components/reviews/stars";
import { SplitHeader } from "@/components/ui/split-header";
import { FAQ } from "@/content/faq";
import { REVIEWS } from "@/content/reviews";

export const metadata: Metadata = {
  title: "Reviews + FAQ",
  description:
    "What members say about Gold's Gym Iloilo on Google, and answers to the questions everyone asks before a first visit.",
  alternates: { canonical: "/reviews-faq" },
};

export default function ReviewsFaqPage() {
  return (
    <>
      <div className="relative isolate overflow-hidden">
        {/* Ambient backdrop: a dark black-and-white lifting shot, faded into the canvas. */}
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <Image
            src="/images/incline-press-bw.jpg"
            alt=""
            fill
            sizes="100vw"
            quality={75}
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

        <section aria-label="Member reviews" className="mx-auto max-w-[1280px] px-6 pb-16 md:px-10 lg:pb-24">
          <ul className="grid gap-6 lg:grid-cols-3">
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
                      <span className="mt-1.5 block font-mono text-[0.8125rem] text-muted">{review.source}</span>
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
        className="relative isolate overflow-hidden border-t border-line-subtle bg-surface"
      >
        <div className="mx-auto grid max-w-[1280px] gap-12 px-6 py-16 md:px-10 lg:grid-cols-12 lg:gap-8 lg:py-24">
          <div className="lg:col-span-5">
            <h2
              id="faq-title"
              className="font-display text-[clamp(2.5rem,5vw,3.75rem)] leading-[0.95] uppercase"
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
                quality={84}
                className="object-cover object-center"
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <Accordion items={FAQ} defaultOpenId={FAQ[0].id} />
          </div>
        </div>
      </section>
    </>
  );
}
