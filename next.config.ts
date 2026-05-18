/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "indiansinkorea.com",
      },
    ],
    unoptimized: true,
  },
};

module.exports = nextConfig;
