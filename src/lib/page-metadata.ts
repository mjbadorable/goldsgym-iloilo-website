import type { Metadata } from "next";
import { SITE } from "./site.ts";

/** Share card for links to the site. The file is 1080x630. */
export const OG_IMAGE = {
  url: "/images/og-share.jpg",
  width: 1080,
  height: 630,
  alt: "The training floor at Gold's Gym Iloilo",
} as const;

/**
 * Metadata for one page: title, description, canonical URL and a matching Open Graph / Twitter card.
 * A page's `openGraph` replaces the layout's wholesale rather than merging with it, so each page
 * states the whole card here, with the page's own title, description and URL.
 * Omit `title` for the home page, which uses the layout's default title.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title?: string;
  description: string;
  path: string;
}): Metadata {
  const cardTitle = title ? `${title} | ${SITE.name}` : `${SITE.name}: your strongest starts here`;
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      locale: "en_PH",
      title: cardTitle,
      description,
      url: path,
      images: [OG_IMAGE],
    },
    twitter: { card: "summary_large_image", title: cardTitle, description },
  };
}
