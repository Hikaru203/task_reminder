import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Base path for GitHub Pages (repo name)
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
};

export default nextConfig;
