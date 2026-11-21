import { NamedIcon } from "@/components/ui/zone-icons";
import type { IconName } from "@/content/zones";

// Titles are the gym's own claims; the supporting lines restate facts from its site copy.
// Lines are kept short so every cell stays two lines of text and the strip stays about 108px tall
// on desktop (the hero reserves 116px for it).
const ITEMS: { icon: IconName; title: string; text: string }[] = [
  { icon: "plate", title: "World-Class Equipment", text: "Gym80 machines and a full free-weight floor." },
  { icon: "users", title: "Expert Coaches", text: "Three fitness coaches on the floor." },
  { icon: "kettlebell", title: "Functional Training", text: "Open space for sleds, kettlebells and carries." },
  { icon: "shield", title: "Safe & Clean Facility", text: "Clean, well-maintained facilities." },
];

export function HighlightStrip() {
  return (
    <section aria-label="Highlights" className="border-y border-line-subtle bg-surface">
      <div className="shell">
        <ul className="grid grid-cols-2 gap-px bg-line-subtle lg:grid-cols-4">
          {ITEMS.map((item) => (
            <li
              key={item.title}
              className="flex flex-col gap-3 bg-surface p-5 lg:flex-row lg:items-center lg:gap-4 lg:px-6 lg:py-5"
            >
              <NamedIcon name={item.icon} className="size-8 shrink-0 text-gold" />
              <div>
                <h2 className="font-label text-[1.25rem] leading-[1.05] tracking-[0.04em] uppercase">
                  {item.title}
                </h2>
                <p className="mt-1 text-[0.8125rem] leading-snug text-muted">{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
