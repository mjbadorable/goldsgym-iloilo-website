// One small authored icon set: 24px grid, 1.75 stroke, round caps. Decorative by default
// (aria-hidden); put the meaning in adjacent text or an aria-label on the control.
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Icon({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const ArrowRight = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </Icon>
);

export const Phone = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  </Icon>
);

export const Mail = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3" y="5" width="18" height="14" rx="1.5" />
    <path d="m3.5 7 8.5 6.5L20.5 7" />
  </Icon>
);

export const MessageSquare = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 5h16v11H9l-5 4V5Z" />
  </Icon>
);

export const Copy = (p: IconProps) => (
  <Icon {...p}>
    <rect x="9" y="9" width="11" height="11" rx="1.5" />
    <path d="M5 15V5.5A1.5 1.5 0 0 1 6.5 4H15" />
  </Icon>
);

export const Check = (p: IconProps) => (
  <Icon {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Icon>
);

export const Close = (p: IconProps) => (
  <Icon {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Icon>
);

export const Menu = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Icon>
);

export const MapPin = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </Icon>
);

export const Star = (p: IconProps) => (
  <Icon {...p} fill="currentColor" strokeWidth={1}>
    <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" />
  </Icon>
);

export const Play = (p: IconProps) => (
  <Icon {...p}>
    <path d="M8 5.5v13l10.5-6.5L8 5.5Z" />
  </Icon>
);

export const ArrowUpRight = (p: IconProps) => (
  <Icon {...p}>
    <path d="M7 17 17 7M8.5 7H17v8.5" />
  </Icon>
);

export const Dumbbell = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3.5 9v6M6.5 6.5v11M17.5 6.5v11M20.5 9v6M6.5 12h11" />
  </Icon>
);

export const Plate = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5.5" />
    <circle cx="12" cy="12" r="1.5" />
  </Icon>
);

export const Pulse = (p: IconProps) => (
  <Icon {...p}>
    <path d="M2.5 12h4.5l2.5-7 5 14 2.5-7h5" />
  </Icon>
);

export const Kettlebell = (p: IconProps) => (
  <Icon {...p}>
    <path d="M8.8 9.8V7.5a3.2 3.2 0 0 1 6.4 0v2.3" />
    <circle cx="12" cy="14.5" r="6" />
  </Icon>
);

export const Users = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
    <circle cx="17" cy="9" r="2.5" />
    <path d="M17 14c2.4 0 4.5 1.8 4.5 4.5" />
  </Icon>
);

export const ShieldCheck = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 3 19.5 6v5.5c0 4.5-3.2 8-7.5 9.5-4.3-1.5-7.5-5-7.5-9.5V6L12 3Z" />
    <path d="m8.8 12 2.4 2.4 4-4.4" />
  </Icon>
);

export const Sparkle = (p: IconProps) => (
  <Icon {...p}>
    <path d="m12 3 1.9 5.6 5.6 1.9-5.6 1.9L12 18l-1.9-5.6L4.5 10.5l5.6-1.9L12 3Z" />
    <path d="M19 16.5v3.5M17.25 18.25h3.5" />
  </Icon>
);

export const Car = (p: IconProps) => (
  <Icon {...p}>
    <path d="m3.5 14.5 1.8-5A2 2 0 0 1 7.2 8h9.6a2 2 0 0 1 1.9 1.5l1.8 5V18h-2.5v-1.5h-11V18H3.5v-3.5Z" />
    <path d="M7.5 12.5h.01M16.5 12.5h.01" strokeWidth={2.5} />
  </Icon>
);

export const ArrowLeft = (p: IconProps) => (
  <Icon {...p}>
    <path d="M20 12H5M11 6l-6 6 6 6" />
  </Icon>
);

export const Clock = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </Icon>
);

export const Calendar = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="1.5" />
    <path d="M3.5 10h17M8 3v4M16 3v4" />
  </Icon>
);

export const Sun = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5V5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8" />
  </Icon>
);

export const Globe = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.6 2.6 4 5.7 4 9s-1.4 6.4-4 9c-2.6-2.6-4-5.7-4-9s1.4-6.4 4-9Z" />
  </Icon>
);

export const Trophy = (p: IconProps) => (
  <Icon {...p}>
    <path d="M8 4h8v5a4 4 0 0 1-8 0V4Z" />
    <path d="M8 6H4.5v1.5A3.5 3.5 0 0 0 8 11M16 6h3.5v1.5A3.5 3.5 0 0 1 16 11M12 13v4M10 17h4M8.5 20h7" />
  </Icon>
);

export const Pause = (p: IconProps) => (
  <Icon {...p} strokeWidth={2.25}>
    <path d="M8.5 5.5v13M15.5 5.5v13" />
  </Icon>
);

export const HeartPulse = (p: IconProps) => (
  <Icon {...p}>
    <path d="M19.5 12.6 12 20l-7.5-7.4A5 5 0 0 1 12 5.9a5 5 0 0 1 7.5 6.7Z" />
    <path d="M6.5 12h2.7l1.3-2.6 2.5 5 1.3-2.4h3.2" />
  </Icon>
);

export const Flame = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 3c2.4 2.8 5.5 5.6 5.5 10a5.5 5.5 0 1 1-11 0c0-2.1.8-4 2-5.5.2 1.6 1.2 2.5 2.1 2.7-.4-2.4.3-5.2 1.4-7.2Z" />
  </Icon>
);

export const Pill = (p: IconProps) => (
  <Icon {...p}>
    <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
    <path d="m8.5 8.5 7 7" />
  </Icon>
);

export const User = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="8" r="3.5" />
    <path d="M5 20c0-3.6 3.1-6.5 7-6.5s7 2.9 7 6.5" />
  </Icon>
);

export const BoxingGlove = (p: IconProps) => (
  <Icon {...p}>
    <path d="M7.5 16.5V19a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5v-2.5" />
    <path d="M7 16.5h10a2.5 2.5 0 0 0 2.5-2.5V9.5A5.5 5.5 0 0 0 14 4h-2a5 5 0 0 0-5 5v1.5H6a2 2 0 0 0-2 2v1a3 3 0 0 0 3 3Z" />
    <path d="M7 10.5h3.5" />
  </Icon>
);

export const Utensils = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 3v6a3 3 0 0 0 6 0V3M8 3v18M18 3v18M18 3c-2 2-2.5 5-2.5 8.5H18" />
  </Icon>
);

export const Home = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3.5 10.5 12 3.5l8.5 7" />
    <path d="M5.5 9.5V20h13V9.5" />
    <path d="M9.5 20v-5.5h5V20" />
  </Icon>
);

export const Info = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 16v-4.5M12 8.25h.01" />
  </Icon>
);

export const HelpCircle = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M9.5 9.5a2.6 2.6 0 0 1 5 .9c0 1.7-2.5 2.1-2.5 3.6M12 17h.01" />
  </Icon>
);

export const ChevronRight = (p: IconProps) => (
  <Icon {...p}>
    <path d="m9 6 6 6-6 6" />
  </Icon>
);
