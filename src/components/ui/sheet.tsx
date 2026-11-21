"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

const CLOSE_MS = 240;

type SheetProps = {
  isOpen: boolean;
  onClose: () => void;
  /** id of the element inside that titles the dialog. */
  labelledBy: string;
  wide?: boolean;
  children: ReactNode;
};

/**
 * Right-hand slide-over built on a native <dialog> opened with showModal(), which gives focus
 * trapping, Escape, an inert page behind it and focus restore for free.
 * `data-state` drives the CSS transition; the dialog is only closed after the slide-out finishes,
 * and reopening mid-close cancels the timer, so it is interruptible.
 */
export function Sheet({ isOpen, onClose, labelledBy, wide, children }: SheetProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
        // Transitions don't run out of display:none. Reading layout flushes styles so the
        // closed (off-screen) state is committed before data-state flips to open.
        dialog.getBoundingClientRect();
        // Start on the Close button rather than the scrollable panel (which browsers make focusable).
        dialog.querySelector<HTMLElement>("[data-sheet-close]")?.focus();
      }
      dialog.setAttribute("data-state", "open");
      return;
    }
    if (dialog.open) {
      dialog.setAttribute("data-state", "closed");
      const timer = setTimeout(() => dialog.close(), CLOSE_MS);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <dialog
      ref={ref}
      className={cn("sheet", wide && "sheet--wide")}
      aria-labelledby={labelledBy}
      onCancel={(e) => {
        // Escape: run our animated close instead of the instant native one.
        e.preventDefault();
        onClose();
      }}
      onClose={() => {
        // Keeps state in sync if the dialog is ever closed natively.
        if (isOpen) onClose();
      }}
      onClick={(e) => {
        // The dialog fills the viewport; a click on it (not on the panel) is a click outside.
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="sheet-panel">{children}</div>
    </dialog>
  );
}
