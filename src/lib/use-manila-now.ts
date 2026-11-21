"use client";

import { useSyncExternalStore } from "react";

// The clock is an external store: a minute-granularity snapshot that re-renders every 30s and when
// the tab becomes visible again (a tab left open overnight catches up the moment it is looked at).
// The server snapshot is empty, so prerendered HTML and hydration agree and the real time appears
// right after hydration. Next 16 cache components forbid reading the clock during render.
function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 30_000);
  document.addEventListener("visibilitychange", onChange);
  return () => {
    clearInterval(id);
    document.removeEventListener("visibilitychange", onChange);
  };
}
const getSnapshot = () => String(Math.floor(Date.now() / 60_000));
const getServerSnapshot = () => "";

/** The current time, rounded down to the minute; `null` until the client has hydrated. */
export function useNow(): Date | null {
  const minute = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return minute ? new Date(Number(minute) * 60_000) : null;
}
