"use client";

import { useEffect, useRef, type PointerEvent, type ReactNode } from "react";

export const STACK_PUSH_MS = 450;
const EDGE_HIT_PX = 44;
const POP_DISTANCE_RATIO = 0.3;
const POP_VELOCITY_PX_PER_MS = 0.45;

type StackPushSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  /** id of the heading inside the pushed view; receives focus on open. */
  labelledBy: string;
  children: ReactNode;
};

/**
 * Native mobile-style stack push built on <dialog> (top layer, inert background, focus trap).
 * - Forward push: new view slides 100% -> 0 while the underlying page shifts -28% and dims.
 * - Pop back: exact reverse over 450ms cubic-bezier(0.32, 0.72, 0, 1).
 * - Left-edge swipe: pointer events drag the panel live and release-snap based on velocity or distance.
 * - Reduced motion: short cross-fade with zero translation (handled in globals.css).
 */
export function StackPushSheet({ isOpen, onClose, labelledBy, children }: StackPushSheetProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    lastX: number;
    lastTime: number;
    velocity: number;
    width: number;
    active: boolean;
  } | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const html = document.documentElement;
    if (!dialog) return;

    if (isOpen) {
      let frameId = 0;
      if (!dialog.open) {
        dialog.showModal();
        dialog.setAttribute("data-direction", "forward");
        const heading = document.getElementById(labelledBy);
        heading?.focus({ preventScroll: true });
        frameId = requestAnimationFrame(() => {
          dialog.setAttribute("data-state", "open");
          html.setAttribute("data-stack-push", "open");
        });
      } else {
        dialog.setAttribute("data-direction", "forward");
        dialog.setAttribute("data-state", "open");
        html.setAttribute("data-stack-push", "open");
      }
      return () => {
        if (frameId) cancelAnimationFrame(frameId);
      };
    }

    if (dialog.open) {
      dialog.setAttribute("data-direction", "back");
      dialog.setAttribute("data-state", "closed");
      html.setAttribute("data-stack-push", "closed");
      const timer = setTimeout(() => {
        dialog.close();
        html.removeAttribute("data-stack-push");
        html.style.removeProperty("--stack-drag-x");
        html.style.removeProperty("--stack-drag-dim");
        if (panelRef.current) {
          panelRef.current.style.removeProperty("transform");
        }
      }, STACK_PUSH_MS);
      return () => clearTimeout(timer);
    }
  }, [isOpen, labelledBy]);

  useEffect(() => {
    return () => {
      const html = document.documentElement;
      html.removeAttribute("data-stack-push");
      html.removeAttribute("data-stack-dragging");
      html.style.removeProperty("--stack-drag-x");
      html.style.removeProperty("--stack-drag-dim");
    };
  }, []);

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    const panel = panelRef.current;
    if (!panel || e.button !== 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = panel.getBoundingClientRect();
    const offsetFromLeft = e.clientX - rect.left;
    if (offsetFromLeft > EDGE_HIT_PX) return;

    panel.setPointerCapture(e.pointerId);
    dragRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      lastX: e.clientX,
      lastTime: performance.now(),
      velocity: 0,
      width: rect.width || window.innerWidth,
      active: true,
    };
    document.documentElement.setAttribute("data-stack-dragging", "true");
    dialogRef.current?.setAttribute("data-dragging", "true");
  }

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    const panel = panelRef.current;
    if (!drag || !drag.active || !panel || e.pointerId !== drag.pointerId) return;

    const now = performance.now();
    const dt = Math.max(1, now - drag.lastTime);
    const dx = Math.max(0, e.clientX - drag.startX);
    drag.velocity = (e.clientX - drag.lastX) / dt;
    drag.lastX = e.clientX;
    drag.lastTime = now;

    const progress = Math.min(1, dx / drag.width); // 0 = open, 1 = popped
    panel.style.transform = `translate3d(${dx}px, 0, 0)`;

    const html = document.documentElement;
    html.style.setProperty("--stack-drag-x", `${(-28 * (1 - progress)).toFixed(3)}%`);
    html.style.setProperty("--stack-drag-dim", `${(0.16 * (1 - progress)).toFixed(3)}`);
  }

  function finishDrag(e: PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    const panel = panelRef.current;
    if (!drag || !drag.active || !panel || e.pointerId !== drag.pointerId) return;

    drag.active = false;
    if (panel.hasPointerCapture(e.pointerId)) {
      panel.releasePointerCapture(e.pointerId);
    }

    const dx = Math.max(0, e.clientX - drag.startX);
    const shouldPop = dx / drag.width > POP_DISTANCE_RATIO || drag.velocity > POP_VELOCITY_PX_PER_MS;

    const html = document.documentElement;
    html.removeAttribute("data-stack-dragging");
    dialogRef.current?.removeAttribute("data-dragging");
    html.style.removeProperty("--stack-drag-x");
    html.style.removeProperty("--stack-drag-dim");
    panel.style.removeProperty("transform");
    dragRef.current = null;

    if (shouldPop) {
      onClose();
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className="stack-push"
      aria-labelledby={labelledBy}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClose={() => {
        if (isOpen) onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        className="stack-push-panel"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
      >
        {children}
      </div>
    </dialog>
  );
}
