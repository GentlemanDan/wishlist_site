import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/wishlist_site' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
