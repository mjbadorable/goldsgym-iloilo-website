import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { FloorBand } from "@/components/home/floor-band";
import { HighlightStrip } from "@/components/home/highlight-strip";
import { Ticker } from "@/components/home/ticker";
import { HOURS } from "@/lib/hours";
import { pageMetadata } from "@/lib/page-metadata";
import { ADDRESS, CONTACT, SITE, SITE_URL } from "@/lib/site";

export const metadata: Metadata = pageMetadata({ description: SITE.description, path: "/" });

const pad = (n: number) => String(n).padStart(2, "0");
const toTime = (minutes: number) => `${pad(Math.floor(minutes / 60))}:${pad(minutes % 60)}`;
const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Structured data so Google shows the brand Site Name ("Gold's Gym Iloilo") above the URL
// along with hours, address and phone. Only facts the gym publishes.
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: SITE.name,
      alternateName: "Gold's Gym Iloilo City",
      url: new URL("/", SITE_URL).toString(),
    },
    {
      "@type": "HealthClub",
      name: SITE.name,
      description: SITE.description,
      image: new URL("/images/og-share.jpg", SITE_URL).toString(),
      // Same form as the WebSite entry above (trailing slash).
      url: new URL("/", SITE_URL).toString(),
      telephone: CONTACT.phoneE164,
      email: CONTACT.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Saint Honore, G/F – Unit A-1A-5, Iloilo Business Park",
        addressLocality: "Mandurriao, Iloilo City",
        addressRegion: "Iloilo",
        postalCode: "5000",
        addressCountry: "PH",
      },
      areaServed: {
        "@type": "City",
        name: "Iloilo City",
      },
      hasMap: ADDRESS.mapsUrl,
      openingHoursSpecification: HOURS.map((r) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: r.days.map((d) => DAY_NAMES[d]),
        opens: toTime(r.open),
        closes: toTime(r.close),
      })),
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <HighlightStrip />
      <FloorBand />
      <Ticker />
      <script
        type="application/ld+json"
        // "<" is escaped so the JSON can never close the script tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
