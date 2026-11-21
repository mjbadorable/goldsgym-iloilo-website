import { Star } from "@/components/ui/icons";

/** Five filled gold stars with one accessible label. */
export function Stars({ className }: { className?: string }) {
  return (
    <span role="img" aria-label="5 out of 5 stars" className={`inline-flex gap-1 text-gold ${className ?? ""}`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className="size-5" />
      ))}
    </span>
  );
}
