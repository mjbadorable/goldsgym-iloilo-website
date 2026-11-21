"use client";

import { createContext, useContext, useRef, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useStickySections } from "@/lib/use-sticky-sections";

const ActiveSectionContext = createContext<string | null>(null);

/** Height of the sticky navbar (`--nav-h` in globals.css), where page-level bars pin. */
export const NAV_HEIGHT_PX = 72;

type StickySectionsProps = {
  /** ids of the <section> elements that contain a <StickyBar>, in page order. */
  ids: readonly string[];
  /** "window": bars pin under the navbar. "panel": bars pin at the top of the enclosing scrolling panel. */
  scope?: "window" | "panel";
  /** Set false while a drawer is closed. */
  enabled?: boolean;
  className?: string;
  children: ReactNode;
};

/** Tracks which section's bar is pinned and tells the <StickyBar>s inside it. */
export function StickySections({ ids, scope = "window", enabled = true, className, children }: StickySectionsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const active = useStickySections(ids, {
    container: scope === "panel" ? ref : null,
    offsetTop: scope === "panel" ? 0 : NAV_HEIGHT_PX,
    enabled,
  });
  return (
    <ActiveSectionContext value={active}>
      <div ref={ref} className={className}>
        {children}
      </div>
    </ActiveSectionContext>
  );
}

type StickyBarProps = {
  /** id of the <section> this bar belongs to (one of the `ids` given to <StickySections>). */
  sectionId: string;
  /** Pin inside a drawer panel (bleeds to the panel edges) instead of under the navbar. */
  panel?: boolean;
  /** Element for the label: a heading when it names its section, otherwise a paragraph. */
  as?: ElementType;
  /** id of the label element, for `aria-labelledby` on the section. */
  id?: string;
  children: ReactNode;
};

/** The bar itself. Must be the first child of its section so it pins for exactly that section. */
export function StickyBar({ sectionId, panel, as: Label = "p", id, children }: StickyBarProps) {
  const active = useContext(ActiveSectionContext);
  return (
    <div
      className={cn("sticky-section-bar", panel && "sticky-section-bar--panel")}
      data-pinned={active === sectionId ? "true" : "false"}
    >
      {/* On pages the label lines up with the content column; in a panel the bar's own padding does. */}
      <Label id={id} className={cn("py-3.5", !panel && "shell")}>
        {children}
      </Label>
    </div>
  );
}
