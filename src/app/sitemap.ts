import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const routes = ["/", "/why-gold-s-gym", "/coaches", "/reviews-faq"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: new URL(route, SITE_URL).toString(),
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
