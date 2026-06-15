/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "indiansinkorea.com",
        pathname: "/storage/v1/object/public/**",
      },
    ],
    unoptimized: true,
  },
};

module.exports = nextConfig;
