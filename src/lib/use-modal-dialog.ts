"use client";

import { useEffect, useRef, type MouseEvent, type ReactEventHandler } from "react";

export const DIALOG_CLOSE_MS = 360;

/**
 * Shared behaviour for native <dialog> modals (slide-over sheets and the coach modal).
 *
 * - Opens with showModal(): focus trap, inert page behind it, focus restore on close.
 * - `data-state` ("open" | "closed") drives the CSS transition. The dialog is only closed after the
 *   exit transition finishes, and reopening mid-close cancels the timer, so it is interruptible.
 * - Escape runs the animated close; a click on the dialog element itself (the backdrop area) closes.
 * - Initial focus goes to the element marked `data-sheet-close` (the Close button).
 */
export function useModalDialog(isOpen: boolean, onClose: () => void) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (isOpen) {
      let frame1 = 0;
      let frame2 = 0;
      if (!dialog.open) {
        dialog.setAttribute("data-state", "closed");
        dialog.showModal();
        dialog.querySelector<HTMLElement>("[data-sheet-close]")?.focus({ preventScroll: true });
        // Double rAF guarantees the browser paints the initial closed frame before transitioning open.
        frame1 = requestAnimationFrame(() => {
          frame2 = requestAnimationFrame(() => {
            dialog.setAttribute("data-state", "open");
          });
        });
      } else {
        dialog.setAttribute("data-state", "open");
      }
      return () => {
        if (frame1) cancelAnimationFrame(frame1);
        if (frame2) cancelAnimationFrame(frame2);
      };
    }
    if (dialog.open) {
      dialog.setAttribute("data-state", "closed");
      const timer = setTimeout(() => dialog.close(), DIALOG_CLOSE_MS);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const dialogProps = {
    onCancel: ((e) => {
      // Escape: run our animated close instead of the instant native one.
      e.preventDefault();
      onClose();
    }) as ReactEventHandler<HTMLDialogElement>,
    onClose: (() => {
      // Keeps state in sync if the dialog is ever closed natively.
      if (isOpen) onClose();
    }) as ReactEventHandler<HTMLDialogElement>,
    onClick: (e: MouseEvent<HTMLDialogElement>) => {
      // The dialog fills the viewport; a click on it (not on the panel) is a click outside.
      if (e.target === e.currentTarget) onClose();
    },
  };

  return { ref, dialogProps };
}
