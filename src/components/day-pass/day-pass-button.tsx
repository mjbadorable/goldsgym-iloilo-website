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

/** Every "Get your free day pass" button on the site is this component. It opens the drawer. */
export function DayPassButton({ children = "Get your free day pass", variant, size, className }: Props) {
  const { open } = useDayPass();
  return (
    <Button variant={variant} size={size} className={className} onClick={open} aria-haspopup="dialog">
      {children}
      <ArrowRight className="size-[1.1em]" />
    </Button>
  );
}
