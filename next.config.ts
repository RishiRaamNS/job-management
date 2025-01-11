import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.logo.dev",
        pathname: "/**", // This allows all paths under img.logo.dev
      },
    ],
  },
};

export default nextConfig;
