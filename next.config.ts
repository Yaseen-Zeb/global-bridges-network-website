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
  // Donate Goods was merged into the tabbed /donate page; volunteering moved to its own /volunteer page.
  async redirects() {
    return [
      { source: "/donate-goods", destination: "/donate?tab=goods", permanent: true },
      { source: "/get-involved", destination: "/volunteer", permanent: true },
      {
        source: "/donate",
        has: [{ type: "query", key: "tab", value: "volunteer" }],
        destination: "/volunteer",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
