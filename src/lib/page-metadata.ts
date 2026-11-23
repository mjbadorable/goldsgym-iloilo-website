import type { Metadata } from "next";
import { SITE } from "./site.ts";

/** Share card for links to the site. The file is 1200x630. */
export const OG_IMAGE = {
  url: "/images/og-share.jpg",
  width: 1200,
  height: 630,
  alt: "Gold's Gym Iloilo — Your strongest Starts here.",
} as const;

export const SHARE_TITLE = "Gold’s Gym Iloilo | Your strongest Starts here.";
export const SHARE_DESCRIPTION = "Train with purpose. Build strength. Keep progressing.";

/**
 * Metadata for one page: per-page SEO title, description and canonical URL for search engines,
 * paired with the unified brand Open Graph / Twitter share card across every route.
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
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      locale: "en_PH",
      title: SHARE_TITLE,
      description: SHARE_DESCRIPTION,
      url: path,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: SHARE_TITLE,
      description: SHARE_DESCRIPTION,
      images: [OG_IMAGE.url],
    },
  };
}
