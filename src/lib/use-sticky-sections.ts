"use client";

import { useCallback, useMemo, useSyncExternalStore, type RefObject } from "react";

export type SectionBox = { id: string; top: number; bottom: number };

/**
 * The section whose bar is pinned: the last one whose top is at or above `threshold` and which has
 * not scrolled out the top yet. `null` when none is (e.g. above the first section, or past the last).
 *
 * `atEnd` is the usual scroll-spy rule: once the scroller is at its very bottom, the last section
 * still on screen counts, even if it is too short to ever reach the threshold (a drawer whose final
 * section fits below the fold, say).
 * Pure, so it can be unit-tested.
 */
export function pickActiveSection(
  sections: readonly SectionBox[],
  threshold: number,
  atEnd = false,
): string | null {
  let active: string | null = null;
  for (const s of sections) {
    if (s.top <= threshold && s.bottom > threshold) active = s.id;
  }
  if (atEnd) {
    for (const s of sections) {
      if (s.bottom > threshold) active = s.id;
    }
  }
  return active;
}

/** True when the scroller can scroll and is at its bottom (2px of slack). */
function isAtEnd(scroller: HTMLElement | null): boolean {
  const el = scroller ?? document.documentElement;
  const viewport = scroller ? scroller.clientHeight : window.innerHeight;
  const scrolled = scroller ? scroller.scrollTop : window.scrollY;
  return el.scrollHeight > viewport + 4 && scrolled + viewport >= el.scrollHeight - 2;
}

// Resolved once per container element; the scroller never changes for the life of a panel.
const scrollerCache = new WeakMap<HTMLElement, HTMLElement | null>();

/** Nearest ancestor that scrolls vertically (a drawer panel), or null when the window scrolls. */
function findScroller(el: HTMLElement): HTMLElement | null {
  if (scrollerCache.has(el)) return scrollerCache.get(el) ?? null;
  let found: HTMLElement | null = null;
  for (let p = el.parentElement; p; p = p.parentElement) {
    const overflowY = getComputedStyle(p).overflowY;
    if (overflowY === "auto" || overflowY === "scroll") {
      found = p;
      break;
    }
  }
  scrollerCache.set(el, found);
  return found;
}

type Options = {
  /**
   * `null` (default) tracks the window. For a drawer, pass a ref to any element inside the scrolling
   * panel; the panel itself is found by walking up to the nearest scrolling ancestor.
   */
  container?: RefObject<HTMLElement | null> | null;
  /** Distance from the top of the scroller where bars pin: 0 in a drawer, the navbar height on a page. */
  offsetTop?: number;
  /** Set false while a drawer is closed. */
  enabled?: boolean;
};

/**
 * Which section's sticky bar is pinned right now. No library: one passive scroll listener on the
 * scroller (plus resize). The state lives in an external store whose snapshot is the active id, so a
 * component re-renders only when that id changes, not on every scroll event.
 */
export function useStickySections(ids: readonly string[], { container = null, offsetTop = 0, enabled = true }: Options = {}) {
  const key = ids.join("|");
  const idList = useMemo(() => (key ? key.split("|") : []), [key]);

  const getScroller = useCallback((): HTMLElement | null | undefined => {
    if (!container) return null; // window
    const el = container.current;
    return el ? findScroller(el) : undefined; // undefined: panel not mounted yet
  }, [container]);

  const subscribe = useCallback(
    (onChange: () => void) => {
      if (!enabled) return () => {};
      const scroller = getScroller() ?? window;
      scroller.addEventListener("scroll", onChange, { passive: true });
      window.addEventListener("resize", onChange, { passive: true });
      return () => {
        scroller.removeEventListener("scroll", onChange);
        window.removeEventListener("resize", onChange);
      };
    },
    [enabled, getScroller],
  );

  const getSnapshot = useCallback((): string => {
    if (!enabled) return "";
    const scroller = getScroller();
    if (scroller === undefined) return "";
    const base = scroller ? scroller.getBoundingClientRect().top : 0;
    // 1px of slack: a bar pinned exactly at the threshold counts as pinned despite sub-pixel layout.
    const threshold = base + offsetTop + 1;
    const boxes: SectionBox[] = [];
    for (const id of idList) {
      const el = document.getElementById(id);
      if (!el) continue;
      const r = el.getBoundingClientRect();
      boxes.push({ id, top: r.top, bottom: r.bottom });
    }
    return pickActiveSection(boxes, threshold, isAtEnd(scroller)) ?? "";
  }, [enabled, getScroller, idList, offsetTop]);

  const active = useSyncExternalStore(subscribe, getSnapshot, () => "");
  return active || null;
}
