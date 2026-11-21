import { cn } from "@/lib/cn";

/** The signature gold V-chevron: a thin gold rule that drops into a V at centre. Decorative. */
export function VDivider({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn("v-divider", className)} />;
}
