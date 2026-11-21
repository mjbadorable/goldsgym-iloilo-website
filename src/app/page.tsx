import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { FloorBand } from "@/components/home/floor-band";
import { HighlightStrip } from "@/components/home/highlight-strip";
import { HOURS } from "@/lib/hours";
import { ADDRESS, CONTACT, SITE, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const pad = (n: number) => String(n).padStart(2, "0");
const toTime = (minutes: number) => `${pad(Math.floor(minutes / 60))}:${pad(minutes % 60)}`;
const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Structured data so Google can show hours, address and phone. Only facts the gym publishes.
const localBusiness = {
  "@context": "https://schema.org",
  "@type": "HealthClub",
  name: SITE.name,
  image: new URL("/images/og-share.jpg", SITE_URL).toString(),
  url: SITE_URL,
  telephone: CONTACT.phoneE164,
  email: CONTACT.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Saint Honore, G/F – Unit A-1A-5, Iloilo Business Park",
    addressLocality: "Mandurriao, Iloilo City",
    addressCountry: "PH",
  },
  hasMap: ADDRESS.mapsUrl,
  openingHoursSpecification: HOURS.map((r) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: r.days.map((d) => DAY_NAMES[d]),
    opens: toTime(r.open),
    closes: toTime(r.close),
  })),
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <HighlightStrip />
      <FloorBand />
      <script
        type="application/ld+json"
        // "<" is escaped so the JSON can never close the script tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
