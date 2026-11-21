import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";
import { ArrowRight } from "@/components/ui/icons";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="shell py-24 lg:py-32">
      <h1 className="max-w-[14ch] font-display text-[length:var(--text-display)] leading-[0.95] uppercase">
        That page skipped leg day.
      </h1>
      <p className="mt-6 max-w-[44ch] text-[1.125rem] text-muted">
        We couldn&rsquo;t find what you were looking for. Head back to the floor.
      </p>
      <ButtonLink href="/" className="mt-8">
        Back to home
        <ArrowRight className="size-[1.1em]" />
      </ButtonLink>
    </section>
  );
}
