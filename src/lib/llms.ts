// Builds /llms.txt, the plain-text fact sheet for AI search engines. Every fact is read from the same
// content files the pages render (site details, hours, zones, facilities, coaches, FAQ), so the file
// cannot drift from the site or carry a credential the site does not state. Pure (relative imports
// only), so `npm test` can check it.
import { COACHES, type Coach } from "../content/coaches.ts";
import { FAQ_TEXT } from "../content/faq-text.ts";
import { PAGE_SEO } from "../content/seo.ts";
import { TOUR_PHOTOS } from "../content/tour.ts";
import { EXPERIENCES, ZONES } from "../content/zones.ts";
import { HOURS, formatMinutes, TIME_ZONE } from "./hours.ts";
import { ADDRESS, CONTACT, NAV, SITE } from "./site.ts";

// The facilities named in the summary sentence, keyed by the gallery photo that shows each one. A key
// with no matching photo throws, so the sentence cannot name something the site does not show.
const HEADLINE_FACILITIES: Record<string, string> = {
  parking: "covered parking",
  showers: "private shower suites",
  "restrooms-lockers": "restrooms and lockers",
  "comfort-room": "smart comfort rooms",
};

function headlineFacilityPhrases(): string[] {
  return Object.entries(HEADLINE_FACILITIES).map(([id, phrase]) => {
    if (!TOUR_PHOTOS.some((p) => p.id === id)) throw new Error(`llms.txt: no gallery photo with id "${id}"`);
    return phrase;
  });
}

const list = (items: readonly string[]) =>
  items.length < 2 ? items.join("") : `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;

const bullets = (items: readonly string[], indent = "") => items.map((item) => `${indent}- ${item}`);

function coachSection(coach: Coach): string[] {
  const lines = [`### ${coach.name} (${coach.role})`, "", `- ${coach.experience}`];
  lines.push(`- Specializations: ${coach.coachingFocus.join("; ")}`);
  if (coach.competitions?.length) {
    lines.push("- Competitions & awards:", ...bullets(coach.competitions, "  "));
  }
  if (coach.certifications?.length) {
    lines.push("- Certifications:", ...bullets(coach.certifications, "  "));
  }
  return lines;
}

/** Where each page is summarised. The sub-page text is the same description search results show. */
function pageSummary(href: string): string {
  switch (href) {
    case "/":
      return SITE.description;
    case PAGE_SEO.about.path:
      return PAGE_SEO.about.description;
    case PAGE_SEO.coaches.path:
      return PAGE_SEO.coaches.description;
    case PAGE_SEO.reviews.path:
      return PAGE_SEO.reviews.description;
    default:
      return "";
  }
}

export function buildLlmsTxt(siteUrl: string): string {
  const origin = siteUrl.replace(/\/+$/, "");
  const amenities = TOUR_PHOTOS.filter((photo) => photo.group === "amenities");
  // The headline facilities are named by the gallery photos that show them.
  const headlineFacilities = list(headlineFacilityPhrases());

  const sections: string[][] = [
    [
      `# ${SITE.name}`,
      "",
      `> ${SITE.name} is a fitness gym at ${ADDRESS.oneLine}, with ${ZONES.length} training zones (${ZONES.map((z) => z.name).join(", ")}), ${COACHES.length} fitness coaches, and facilities that include ${headlineFacilities}.`,
    ],
    [
      "## Key Facts",
      "",
      `- **Website:** ${origin}/`,
      `- **Location:** ${ADDRESS.oneLine}`,
      `- **Google Maps:** ${ADDRESS.mapsUrl}`,
      `- **Opening hours (${TIME_ZONE}):**`,
      ...HOURS.map((r) => `  - ${r.label}: ${formatMinutes(r.open)} – ${formatMinutes(r.close)}`),
      `- **Phone / SMS:** ${CONTACT.phoneDisplay} (${CONTACT.phoneE164})`,
      `- **Email:** ${CONTACT.email}`,
      `- **Visits and rates:** To avail a free day pass or schedule a visit, contact the gym by phone, text or email. Prices are not published online; ask the team for current rates and membership options.`,
    ],
    [
      "## Pages",
      "",
      ...NAV.map((page) => {
        return `- [${page.label}](${origin}${page.href}): ${pageSummary(page.href)}`;
      }),
    ],
    ["## Training Zones", "", ...ZONES.map((zone) => `- **${zone.name}:** ${zone.description}`)],
    [
      "## Facilities & Amenities",
      "",
      ...EXPERIENCES.map((item) => `- **${item.title}:** ${item.description}`),
      ...amenities.map((photo) => `- **${photo.label}:** ${photo.alt}`),
    ],
    ["## Coaches", "", ...coachesBlock()],
    [
      "## Frequently Asked Questions",
      "",
      ...FAQ_TEXT.map((item) => `- **${item.question}** ${item.plainAnswer}`),
    ],
  ];

  return sections.map((lines) => lines.join("\n")).join("\n\n") + "\n";
}

function coachesBlock(): string[] {
  return COACHES.flatMap((coach, i) => (i === 0 ? coachSection(coach) : ["", ...coachSection(coach)]));
}
