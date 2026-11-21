// Response headers applied to every route and the static image cache policy. Kept as plain data with
// no imports so `next.config.ts` can use it and `npm test` can check it.

export type HeaderEntry = { key: string; value: string };

/** The only third-party origin the site loads: the Google Drive promo-video player (an iframe). */
export const VIDEO_ORIGIN = "https://drive.google.com";

export function contentSecurityPolicy(isDev: boolean): string {
  const directives: Record<string, string[]> = {
    "default-src": ["'self'"],
    // Next.js inlines its bootstrap scripts, so 'unsafe-inline' is needed until nonces are adopted.
    // 'unsafe-eval' is only for the dev server's React refresh.
    "script-src": ["'self'", "'unsafe-inline'", ...(isDev ? ["'unsafe-eval'"] : [])],
    "style-src": ["'self'", "'unsafe-inline'"],
    "img-src": ["'self'", "data:", "blob:"],
    "font-src": ["'self'", "data:"],
    "connect-src": ["'self'", ...(isDev ? ["ws:", "wss:"] : [])],
    "frame-src": [VIDEO_ORIGIN],
    "object-src": ["'none'"],
    "base-uri": ["'self'"],
    "form-action": ["'self'"],
    "frame-ancestors": ["'none'"],
  };
  return Object.entries(directives)
    .map(([name, values]) => `${name} ${values.join(" ")}`)
    .join("; ");
}

export function securityHeaders(isDev: boolean): HeaderEntry[] {
  return [
    { key: "X-Content-Type-Options", value: "nosniff" },
    // `frame-ancestors` in the CSP below does the same job; this covers older browsers.
    { key: "X-Frame-Options", value: "DENY" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    // Switches off powerful features the site never uses. autoplay, fullscreen and picture-in-picture
    // are deliberately NOT listed: the promo-video iframe is delegated them through its `allow` attribute.
    {
      key: "Permissions-Policy",
      value: [
        "camera=()",
        "microphone=()",
        "geolocation=()",
        "payment=()",
        "usb=()",
        "accelerometer=()",
        "gyroscope=()",
        "magnetometer=()",
        "browsing-topics=()",
      ].join(", "),
    },
    // Report-Only: violations show in the browser console and block nothing. Promote to an enforced
    // `Content-Security-Policy` once a production page load shows none.
    { key: "Content-Security-Policy-Report-Only", value: contentSecurityPolicy(isDev) },
  ];
}

/**
 * Files in /public/images keep their names when replaced, so they cannot be cached "forever".
 * A day in the browser plus a week of stale-while-revalidate stops the revalidation on every visit.
 */
export const STATIC_IMAGE_CACHE_CONTROL = "public, max-age=86400, stale-while-revalidate=604800";

/** How long Next keeps an optimised copy of an image before re-checking the source (seconds). */
export const IMAGE_MIN_CACHE_TTL = 60 * 60 * 24 * 7;
