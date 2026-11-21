import type { Metadata } from "next";
import Image from "next/image";
import { CoachesGrid } from "@/components/coaches/coaches-grid";
import { SplitHeader } from "@/components/ui/split-header";
import { COACHES } from "@/content/coaches";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata({
  title: "Coaches",
  description:
    "Meet the coaches at Gold's Gym Iloilo: Andrew Miano, Vincent Loui Dorde and Jerry Perje. Strength, technique, conditioning and accountability.",
  path: "/coaches",
});

export default function CoachesPage() {
  return (
    <div className="relative isolate overflow-hidden">
      {/* Upper-right atmospheric coaching photo blended cleanly into the obsidian canvas. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 -z-10 h-[420px] w-full overflow-hidden lg:h-[520px] lg:w-[62%]"
      >
        <Image
          src="/images/coaches-backdrop.jpg"
          alt=""
          fill
          sizes="(min-width: 1024px) 62vw, 100vw"
          quality={75}
          loading="eager"
          className="object-cover object-[70%_25%] opacity-50"
        />
        <div className="scrim-x absolute -inset-px" />
        <div className="scrim-y absolute -inset-px" />
        <div className="absolute -inset-px bg-gradient-to-t from-canvas via-canvas/35 to-canvas/20" />
      </div>

      <SplitHeader
        id="coaches-title"
        title="The right guidance can change how you train."
        intro="Meet our certified fitness coaches. Whether you're building strength, improving performance, or starting your fitness journey, we're here to guide you."
      />
      <CoachesGrid coaches={COACHES} />
    </div>
  );
}
