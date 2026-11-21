"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useModalDialog } from "@/lib/use-modal-dialog";

type SheetProps = {
  isOpen: boolean;
  onClose: () => void;
  /** id of the element inside that titles the dialog. */
  labelledBy: string;
  wide?: boolean;
  children: ReactNode;
};

/** Right-hand slide-over built on a native <dialog>. Behaviour lives in `useModalDialog`. */
export function Sheet({ isOpen, onClose, labelledBy, wide, children }: SheetProps) {
  const { ref, dialogProps } = useModalDialog(isOpen, onClose);

  return (
    <dialog
      ref={ref}
      className={cn("sheet", wide && "sheet--wide")}
      aria-labelledby={labelledBy}
      {...dialogProps}
    >
      <div className="sheet-panel">{children}</div>
    </dialog>
  );
}
