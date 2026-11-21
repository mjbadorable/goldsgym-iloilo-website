"use client";

import { useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";
import { getHoursStatus } from "@/lib/hours";

// The clock is an external store: a minute-granularity snapshot that re-renders every 30s.
// The server snapshot is empty, so the prerendered HTML and hydration agree, and the real
// status appears right after hydration. Status is always computed in Manila time.
function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 30_000);
  return () => clearInterval(id);
}
const getSnapshot = () => String(Math.floor(Date.now() / 60_000));
const getServerSnapshot = () => "";

/**
 * Two-tone split pill. Left segment: status (solid gold when open, muted when closed) with an angled
 * right edge. Right segment: when it closes or opens next. All contrast pairs are 7:1 or better.
 */
export function OpenBadge({ className }: { className?: string }) {
  const minute = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const status = minute ? getHoursStatus(new Date(Number(minute) * 60_000)) : null;
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
          "relative z-10 flex items-center gap-2.5 py-2 pr-6 pl-4 font-label text-[1.125rem] leading-none tracking-[0.06em] uppercase [clip-path:polygon(0_0,100%_0,calc(100%-10px)_100%,0_100%)]",
          isOpen ? "bg-gold text-gold-ink" : "bg-surface text-muted",
        )}
      >
        <span
          aria-hidden="true"
          className={cn("size-2.5 shrink-0 rounded-full", isOpen ? "bg-gold-ink" : "border-2 border-muted")}
        />
        {status ? status.label : "Checking"}
      </span>
      <span className="-ml-2.5 flex items-center bg-canvas/80 py-2 pr-4 pl-6 font-mono text-[0.8125rem] text-fg">
        {status ? status.detail : "Manila time"}
      </span>
    </p>
  );
}
