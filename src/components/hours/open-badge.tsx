"use client";

import { cn } from "@/lib/cn";
import { getHoursStatus } from "@/lib/hours";
import { useNow } from "@/lib/use-manila-now";

/**
 * Two-tone split pill. Left segment: status (solid gold when open, muted when closed) with an angled
 * right edge. Right segment: when it closes or opens next. All contrast pairs are 7:1 or better.
 */
export function OpenBadge({ className }: { className?: string }) {
  // `now` is null until hydration, so the prerendered HTML and the first client render agree.
  // Status is always computed in Manila time.
  const now = useNow();
  const status = now ? getHoursStatus(now) : null;
  const isOpen = status?.isOpen ?? false;

  return (
    <p
      className={cn(
        "inline-flex min-h-10 items-stretch overflow-hidden rounded-full border",
        isOpen ? "border-gold/40" : "border-line-subtle",
        className,
      )}
    >
      {/* The slanted right edge overlaps the next segment, so there is never a gap in the pill. */}
      <span
        className={cn(
          "relative z-10 flex items-center gap-2.5 py-2 pr-5 pl-3.5 font-label text-[1.125rem] leading-none tracking-[0.06em] uppercase [clip-path:polygon(0_0,100%_0,calc(100%-10px)_100%,0_100%)]",
          isOpen ? "bg-gold text-gold-ink" : "bg-surface text-muted",
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "size-2.5 shrink-0 rounded-full",
            isOpen ? "bg-green-600 ring-2 ring-gold-ink/20" : "border-2 border-muted",
          )}
        />
        {status ? status.label : "Checking"}
      </span>
      <span className="-ml-2.5 flex items-center bg-canvas/80 py-2 pr-3.5 pl-5 font-mono text-[0.8125rem] leading-snug text-fg min-[1400px]:whitespace-nowrap">
        {status ? status.detail : "Manila time"}
      </span>
    </p>
  );
}
