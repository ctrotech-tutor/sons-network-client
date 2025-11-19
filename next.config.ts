import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**', // allows all paths on this domain
      },
    ],
  },
  experimental: {
    allowedDevOrigins: ["http://172.16.3.78:3000"],
  },
};

export default nextConfig;
