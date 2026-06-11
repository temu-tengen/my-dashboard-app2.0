import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.google.com', // For Google Favicon API
      },
      {
        protocol: 'https',
        hostname: 'faviconkit.com', // Alternative reliable API
      },
    ],
  },
};

export default nextConfig;
