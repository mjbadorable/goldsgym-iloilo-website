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

export function OpenBadge({ className }: { className?: string }) {
  const minute = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const status = minute ? getHoursStatus(new Date(Number(minute) * 60_000)) : null;

  return (
    <p
      className={cn(
        "inline-flex min-h-10 items-center gap-3 border px-4 py-2",
        status?.isOpen ? "border-gold" : "border-line-subtle",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "size-2.5 shrink-0 rounded-full",
          status?.isOpen ? "bg-gold" : "border-2 border-muted",
        )}
      />
      {status ? (
        <>
          <span
            className={cn(
              "font-label text-[1.25rem] leading-none tracking-[0.06em] uppercase",
              status.isOpen ? "text-gold" : "text-fg",
            )}
          >
            {status.label}
          </span>
          <span className="font-mono text-[0.8125rem] text-muted">{status.detail}</span>
        </>
      ) : (
        <span className="font-mono text-[0.8125rem] text-muted">Checking hours (Manila time)</span>
      )}
    </p>
  );
}
