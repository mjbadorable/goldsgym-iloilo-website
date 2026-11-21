import { NamedIcon } from "@/components/ui/zone-icons";
import type { IconName } from "@/content/zones";

// Titles are the gym's own claims; the supporting lines restate facts from its site copy.
const ITEMS: { icon: IconName; title: string; text: string }[] = [
  { icon: "plate", title: "World-Class Equipment", text: "Gym80 strength machines and a full free-weight floor." },
  { icon: "users", title: "Expert Coaches", text: "Three fitness coaches on the floor." },
  { icon: "kettlebell", title: "Functional Training", text: "Open space for sleds, kettlebells and carries." },
  { icon: "shield", title: "Safe & Clean Facility", text: "Clean, well-maintained, comfortable from warm-up to cooldown." },
];

export function HighlightStrip() {
  return (
    <section aria-label="Highlights" className="border-y border-line-subtle bg-surface">
      <ul className="mx-auto grid max-w-[1280px] grid-cols-2 gap-px bg-line-subtle lg:grid-cols-4">
        {ITEMS.map((item) => (
          <li key={item.title} className="flex flex-col gap-4 bg-surface p-6 lg:flex-row lg:items-start lg:p-8">
            <NamedIcon name={item.icon} className="size-8 shrink-0 text-gold" />
            <div>
              <h2 className="font-label text-[1.375rem] leading-[1.05] tracking-[0.04em] uppercase">
                {item.title}
              </h2>
              <p className="mt-2 text-[0.875rem] text-muted">{item.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
