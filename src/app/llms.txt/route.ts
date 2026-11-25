import { buildLlmsTxt } from "@/lib/llms";
import { SITE_URL } from "@/lib/site";

// A plain-text fact sheet for AI search engines, generated from the same content the pages render
// (see lib/llms.ts), so it can never disagree with the site.
export function GET() {
  return new Response(buildLlmsTxt(SITE_URL), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
