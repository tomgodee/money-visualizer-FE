/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  transpilePackages: ["@react-three/fiber"],
};

module.exports = nextConfig;
