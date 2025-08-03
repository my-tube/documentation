import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    'docs.mytube.mac',
  ],
  output: 'export',
  distDir: 'build',
  trailingSlash: true,
};

module.exports = nextConfig;
