import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Allows an iPhone on the same LAN to load Next.js development assets.
  allowedDevOrigins: ["192.168.11.5"],
  // Cloudflare Pages serves the generated `out/` directory; there is no runtime Worker.
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: process.cwd(),
  },
  ...(basePath
    ? {
        basePath,
        assetPrefix: basePath,
      }
    : {}),
};

export default nextConfig;
