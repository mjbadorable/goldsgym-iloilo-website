import { HOURS } from "./hours.ts";

/**
 * Canonical origin for metadata, sitemap and structured data. Set NEXT_PUBLIC_SITE_URL in Vercel
 * once the custom domain is attached; until then Vercel's production domain is used automatically.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const SITE = {
  name: "Gold's Gym Iloilo",
  tagline: "Your strongest starts here.",
  description:
    "Looking for a fitness gym in Iloilo City? Train at Gold's Gym Iloilo in Iloilo Business Park, Mandurriao—free weights, Gym80 strength equipment, cardio bay, functional training, and personal coaches. Claim a free day pass.",
} as const;

export const CONTACT = {
  phoneDisplay: "0917 327 5902",
  /** E.164 form of the same number, for tel: and sms: links. */
  phoneE164: "+639173275902",
  email: "goldsgymiloilo.management@gmail.com",
} as const;

export const ADDRESS = {
  lines: ["Saint Honore", "G/F – Unit A-1A-5", "Iloilo Business Park", "Mandurriao, Iloilo"],
  oneLine: "Saint Honore, G/F – Unit A-1A-5, Iloilo Business Park, Mandurriao, Iloilo",
  /** Opens Google Maps search for the address. No coordinates are published, so none are invented. */
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Gold's Gym Iloilo, Saint Honore, Iloilo Business Park, Mandurriao, Iloilo"),
} as const;

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/why-gold-s-gym", label: "About" },
  { href: "/coaches", label: "Coaches" },
  { href: "/reviews-faq", label: "Reviews + FAQ" },
] as const;

export const FOOTER_LINKS = [
  { href: "/", label: "Home" },
  { href: "/why-gold-s-gym", label: "About" },
  { href: "/coaches", label: "Coaches" },
  { href: "/reviews-faq#faq", label: "FAQ" },
] as const;

export { HOURS };
