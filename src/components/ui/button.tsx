import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline";
type Size = "md" | "sm";

const base =
  "inline-flex shrink-0 items-center justify-center gap-2 font-label uppercase leading-none tracking-[0.06em] " +
  "select-none whitespace-nowrap transition-[background-color,color,border-color,transform] duration-[160ms] " +
  "ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-gold text-gold-ink hover:bg-gold-hover",
  outline: "border border-gold/55 text-fg hover:border-gold hover:text-gold",
};

const sizes: Record<Size, string> = {
  md: "h-12 px-6 text-[1.25rem]",
  sm: "h-10 px-4 text-[1.125rem]",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonProps = ComponentProps<"button"> & { variant?: Variant; size?: Size };

export function Button({ variant, size, className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonClasses(variant, size, className)} {...props} />;
}

type ButtonLinkProps = ComponentProps<typeof Link> & { variant?: Variant; size?: Size };

export function ButtonLink({ variant, size, className, ...props }: ButtonLinkProps) {
  return <Link className={buttonClasses(variant, size, className)} {...props} />;
}
