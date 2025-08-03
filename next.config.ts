import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    'docs.mytube.mac',
  ],

  assetPrefix: process.env.NODE_ENV === 'production' ? '/documentation/' : '/',
  basePath: process.env.NODE_ENV === 'production' ? '/documentation' : '',
  distDir: 'build',
  images: {
    unoptimized: true, // Recommended for static exports if not using a custom image loader
  },
  output: 'export',
  trailingSlash: true,
};

module.exports = nextConfig;
