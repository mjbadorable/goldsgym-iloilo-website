import type { Metadata } from "next";
import { CoachesGrid } from "@/components/coaches/coaches-grid";
import { SplitHeader } from "@/components/ui/split-header";
import { COACHES } from "@/content/coaches";

export const metadata: Metadata = {
  title: "Coaches",
  description:
    "Meet the coaches at Gold's Gym Iloilo: Andrew Miano, Vincent Loui Dorde and Jerry Perje. Strength, technique, conditioning and accountability.",
  alternates: { canonical: "/coaches" },
};

export default function CoachesPage() {
  return (
    <>
      <SplitHeader
        id="coaches-title"
        title="The right guidance can change how you train."
        intro="Meet our certified fitness coaches. Whether you're building strength, improving performance, or starting your fitness journey, we're here to guide you."
      />
      <CoachesGrid coaches={COACHES} />
    </>
  );
}
