"use client";

import { useEffect, type ReactNode } from "react";

/**
 * Remounts on every App Router navigation so each page enters from the very top (unless a #hash
 * target is requested) with a smooth fade blend while Navbar and Footer stay persistent.
 */
export default function Template({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, []);

  return <div className="page-enter">{children}</div>;
}
