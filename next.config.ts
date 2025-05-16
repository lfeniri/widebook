import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable TypeScript type checking during build
  typescript: {
    // Allow production builds to complete even if your project has type errors
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
