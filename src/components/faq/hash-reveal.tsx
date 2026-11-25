"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type HashRevealProps = {
  children: ReactNode;
  className?: string;
  /** Entrance delay on a normal page load: the FAQ follows the review cards. */
  delayMs: number;
  /** Entrance delay when the visitor arrives at `#faq`; they came for this section, so don't make them wait. */
  hashDelayMs: number;
};

/**
 * A `.deck-reveal` block whose delay shortens when the page is opened at `#faq`.
 * A fresh load at `#faq` is handled in CSS (`#faq:target .deck-reveal`, so there is no wait for
 * hydration). A client-side navigation to `#faq` does not update `:target`, so the effect covers it.
 */
export function HashReveal({ children, className, delayMs, hashDelayMs }: HashRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.location.hash === "#faq") ref.current?.style.setProperty("--delay", `${hashDelayMs}ms`);
  }, [hashDelayMs]);

  return (
    <div
      ref={ref}
      className={cn("deck-reveal", className)}
      style={{ "--delay": `${delayMs}ms`, "--hash-delay": `${hashDelayMs}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
