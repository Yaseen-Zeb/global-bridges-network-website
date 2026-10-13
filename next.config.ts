import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  // Donate Goods and Get Involved were merged into the tabbed /donate page.
  async redirects() {
    return [
      { source: "/donate-goods", destination: "/donate?tab=goods", permanent: true },
      { source: "/get-involved", destination: "/donate?tab=volunteer", permanent: true },
    ];
  },
};

export default nextConfig;
