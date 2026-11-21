import type { ReactNode } from "react";

/**
 * Page header: big headline on the left, a short intro on the right marked by a 2px gold rule.
 * The rule is its own element (not a border) so it reads as a rule, not a card edge.
 */
export function SplitHeader({ id, title, intro }: { id: string; title: ReactNode; intro: ReactNode }) {
  return (
    <section aria-labelledby={id}>
      <div className="shell grid gap-8 pt-12 pb-12 lg:grid-cols-12 lg:items-end lg:gap-8 lg:pt-[var(--section-y)] lg:pb-16">
        <h1
          id={id}
          className="font-display text-[length:var(--text-display)] leading-[0.95] uppercase lg:col-span-7"
        >
          {title}
        </h1>
        <div className="relative pl-6 lg:col-span-4 lg:col-start-9">
          <span aria-hidden="true" className="absolute inset-y-0 left-0 w-0.5 bg-gold" />
          <p className="max-w-[44ch] text-[length:var(--text-body)] text-fg/85">{intro}</p>
        </div>
      </div>
    </section>
  );
}
