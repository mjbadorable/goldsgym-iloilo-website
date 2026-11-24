"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "@/components/ui/icons";
import { useDayPass } from "./day-pass-provider";

type Props = {
  children?: ReactNode;
  variant?: "primary" | "outline";
  size?: "md" | "sm";
  className?: string;
  /** Runs just before the drawer opens, e.g. to close a menu the button lives in. */
  onOpen?: () => void;
};

/** Inline text link that opens the same drawer, for use inside paragraphs. */
export function DayPassTextButton({ children }: { children: ReactNode }) {
  const { open } = useDayPass();
  return (
    <button type="button" onClick={open} aria-haspopup="dialog" className="link-underline text-gold">
      {children}
    </button>
  );
}

/** Every "Contact us" button on the site is this component. It opens the contact drawer. */
export function DayPassButton({ children = "Contact us", variant, size, className, onOpen }: Props) {
  const { open } = useDayPass();
  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={() => {
        onOpen?.();
        open();
      }}
      aria-haspopup="dialog"
    >
      {children}
      <ArrowRight className="size-[1.1em]" />
    </Button>
  );
}
