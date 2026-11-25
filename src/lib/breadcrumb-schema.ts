import { SITE_URL } from "./site.ts";

/** Builds BreadcrumbList JSON-LD so Google Search shows clean breadcrumb paths and sitelinks. */
export function breadcrumbSchema(label: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: new URL("/", SITE_URL).toString(),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: label,
        item: new URL(path, SITE_URL).toString(),
      },
    ],
  };
}
