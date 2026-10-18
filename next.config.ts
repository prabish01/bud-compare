import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  // Let the dev server's scripts load through a Cloudflare tunnel (dev only).
  allowedDevOrigins: ["*.trycloudflare.com"],
  cacheComponents: true,
  partialPrefetching: true,
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
