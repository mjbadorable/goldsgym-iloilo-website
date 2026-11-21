import type { Metadata } from "next";
import { Accordion } from "@/components/faq/accordion";
import { Stars } from "@/components/reviews/stars";
import { FAQ } from "@/content/faq";
import { REVIEWS, type Review } from "@/content/reviews";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Reviews + FAQ",
  description:
    "What members say about Gold's Gym Iloilo on Google, and answers to the questions everyone asks before a first visit.",
  alternates: { canonical: "/reviews-faq" },
};

function ReviewCard({ review, featured = false }: { review: Review; featured?: boolean }) {
  return (
    <figure
      className={cn(
        "hairline flex h-full flex-col justify-between gap-10 p-8 md:p-12",
        featured ? "bg-elevated" : "bg-surface",
      )}
    >
      <div>
        <Stars />
        <blockquote
          className={cn(
            "mt-6",
            featured
              ? "font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.98] uppercase"
              : "text-[1.375rem] leading-snug font-medium text-fg",
          )}
        >
          <p>&ldquo;{review.quote}&rdquo;</p>
        </blockquote>
      </div>
      <figcaption className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <span className="font-label text-[1.5rem] leading-none tracking-[0.04em] uppercase">
          {review.author}
        </span>
        <span className="font-mono text-[0.8125rem] text-muted">{review.source}</span>
      </figcaption>
    </figure>
  );
}

export default function ReviewsFaqPage() {
  const [featured, ...rest] = REVIEWS;

  return (
    <>
      <section aria-labelledby="reviews-title">
        <div className="mx-auto max-w-[1280px] px-6 pt-12 pb-12 md:px-10 lg:pt-24 lg:pb-16">
          <h1
            id="reviews-title"
            className="max-w-[18ch] font-display text-[clamp(3rem,8.5vw,6rem)] leading-[0.95] uppercase"
          >
            The floor is only part of the experience.
          </h1>
        </div>

        <ul className="mx-auto grid max-w-[1280px] gap-6 px-6 pb-16 md:px-10 lg:grid-cols-2 lg:pb-24">
          <li className="lg:col-span-2">
            <ReviewCard review={featured} featured />
          </li>
          {rest.map((review) => (
            <li key={review.id}>
              <ReviewCard review={review} />
            </li>
          ))}
        </ul>
      </section>

      <section
        id="faq"
        aria-labelledby="faq-title"
        className="border-t border-line-subtle bg-surface"
      >
        <div className="mx-auto grid max-w-[1280px] gap-12 px-6 py-16 md:px-10 lg:grid-cols-12 lg:gap-8 lg:py-24">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-[calc(var(--nav-h)+32px)]">
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
            </div>
          </div>

          <div className="lg:col-span-8">
            <Accordion items={FAQ} defaultOpenId={FAQ[0].id} />
          </div>
        </div>
      </section>
    </>
  );
}
