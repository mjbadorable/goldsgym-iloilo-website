import type { ReactNode } from "react";

/**
 * Remounts on every App Router navigation so each page enters with a smooth fade blend
 * while the Navbar and Footer remain persistent in layout.tsx.
 */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
