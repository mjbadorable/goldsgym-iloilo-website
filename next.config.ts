import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Pin the workspace root to this folder. A stray package-lock.json in the user's home
// directory otherwise makes Next infer the wrong root.
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  outputFileTracingRoot: projectRoot,
  turbopack: {
    root: projectRoot,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    // `qualities` is required in Next 16. Every <Image> in this repo uses one of these.
    qualities: [75, 85],
    formats: ["image/avif", "image/webp"],
    // Everything is served from /public/images; nothing is fetched from Framer.
    localPatterns: [{ pathname: "/images/**" }],
  },
};

export default nextConfig;
