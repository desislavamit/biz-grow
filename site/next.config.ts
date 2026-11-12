import type { NextConfig } from "next";

// Default: static export to `out/` for plain shared hosting (public_html).
// BUILD_MODE=node: standalone Node server for cPanel "Setup Node.js App" or similar.
const isNodeBuild = process.env.BUILD_MODE === "node";

const nextConfig: NextConfig = {
  output: isNodeBuild ? "standalone" : "export",
  // `/en/` is emitted as `en/index.html`, so plain Apache/cPanel hosting serves it without rewrites.
  trailingSlash: true,
  images: { unoptimized: true },
  experimental: {
    // Needed for a site-wide 404 page with multiple root layouts (one per locale).
    globalNotFound: true,
  },
  poweredByHeader: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
