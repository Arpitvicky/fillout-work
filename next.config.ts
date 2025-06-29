import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true, // Skips type checking entirely during build
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
