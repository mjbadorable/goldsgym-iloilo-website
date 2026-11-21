"use client";

import { useState } from "react";
import { Pause, Play } from "@/components/ui/icons";

// Real facts about the gym, all taken from the site's own copy.
const ITEMS = [
  "Gold’s Gym Iloilo",
  "Free Weights",
  "Gym80 Strength",
  "Cardio Bay",
  "Functional Training",
  "Iloilo Business Park",
];

function Group({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul
      className={`flex shrink-0 items-center ${duplicate ? "ticker-dup" : ""}`}
      aria-hidden={duplicate ? true : undefined}
    >
      {ITEMS.map((item) => (
        <li key={item} className="flex items-center whitespace-nowrap">
          <span>{item}</span>
          {/* Diamond separator drawn with CSS (not a text glyph). */}
          <span aria-hidden="true" className="mx-8 size-1.5 rotate-45 bg-gold-ink" />
        </li>
      ))}
    </ul>
  );
}

/** Slim full-bleed gold band that slides the gym's key facts. Moves only when motion is allowed. */
export function Ticker() {
  const [paused, setPaused] = useState(false);

  return (
    <section
      aria-label="Gold's Gym Iloilo at a glance"
      className="ticker relative overflow-hidden bg-gold text-gold-ink"
      data-paused={paused}
    >
      <div className="ticker-track py-4 font-label text-[1.25rem] leading-none tracking-[0.12em] uppercase">
        <Group />
        <Group duplicate />
      </div>

      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        aria-label={paused ? "Play the scrolling highlights" : "Pause the scrolling highlights"}
        className="ticker-toggle absolute inset-y-0 right-0 z-10 flex items-center bg-gold px-[var(--gutter)] text-gold-ink shadow-[-1.5rem_0_1rem_0_var(--accent)] transition-opacity duration-[160ms] hover:opacity-70"
      >
        {paused ? <Play className="size-5" /> : <Pause className="size-5" />}
      </button>
    </section>
  );
}
