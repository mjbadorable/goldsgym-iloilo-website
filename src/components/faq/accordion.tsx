"use client";

import { useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Item = { id: string; question: string; answer: ReactNode };

/**
 * Independent disclosure items (several can be open at once). Height animates with
 * grid-template-rows 0fr -> 1fr; a closed panel is `inert` so its links leave the tab order.
 */
export function Accordion({ items, defaultOpenId }: { items: Item[]; defaultOpenId?: string }) {
  const uid = useId();
  const [open, setOpen] = useState<ReadonlySet<string>>(() => new Set(defaultOpenId ? [defaultOpenId] : []));

  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <ul className="space-y-3">
      {items.map((item) => {
        const isOpen = open.has(item.id);
        const buttonId = `${uid}-${item.id}-q`;
        const panelId = `${uid}-${item.id}-a`;
        return (
          <li key={item.id} className="hairline bg-elevated">
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="flex min-h-16 w-full items-center justify-between gap-6 px-6 py-4 text-left outline-offset-[-3px] md:px-8"
              >
                <span
                  className={cn(
                    "font-label text-[1.5rem] leading-[1.1] tracking-[0.04em] uppercase transition-colors duration-[160ms] md:text-[1.75rem]",
                    isOpen && "text-gold",
                  )}
                >
                  {item.question}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "relative size-6 shrink-0 text-gold transition-transform duration-[240ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                    isOpen && "rotate-45",
                  )}
                >
                  <span className="absolute top-1/2 left-0 h-0.5 w-full -translate-y-1/2 bg-current" />
                  <span className="absolute top-0 left-1/2 h-full w-0.5 -translate-x-1/2 bg-current" />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className="accordion-panel"
              data-open={isOpen}
              inert={!isOpen}
            >
              <div>
                <p className="max-w-[62ch] px-6 pb-6 text-[1.0625rem] text-muted md:px-8 md:pb-8">
                  {item.answer}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
