import type { SVGProps } from "react";
import type { IconName } from "@/content/zones";
import { Car, Dumbbell, Kettlebell, Plate, Pulse, ShieldCheck, Sparkle, Users } from "./icons";

const map = {
  dumbbell: Dumbbell,
  plate: Plate,
  pulse: Pulse,
  kettlebell: Kettlebell,
  sparkle: Sparkle,
  car: Car,
  users: Users,
  shield: ShieldCheck,
} satisfies Record<IconName, (p: SVGProps<SVGSVGElement>) => React.JSX.Element>;

/** Looks up an authored icon by name. Decorative (aria-hidden is set by the base icon). */
export function NamedIcon({ name, ...props }: { name: IconName } & SVGProps<SVGSVGElement>) {
  const Cmp = map[name];
  return <Cmp {...props} />;
}
