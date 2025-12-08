import type { NextConfig } from "next";

import nextMDX from '@next/mdx';

import { recmaPlugins } from './src/mdx/recma.mjs'
import { rehypePlugins } from './src/mdx/rehype.mjs'
import { remarkPlugins } from './src/mdx/remark.mjs'
import withSearch from './src/mdx/search.mjs'


const withMDX = nextMDX({
  options: {
    remarkPlugins,
    rehypePlugins,
    recmaPlugins,
  },
});

const nextConfig:NextConfig = {
  allowedDevOrigins: [
    'docs.mytube.mac',
  ],

  // assetPrefix: process.env.NODE_ENV === 'production' ? '/documentation/' : '',
  // basePath: process.env.NODE_ENV === 'production' ? '/documentation' : '',
  distDir: 'build',
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true, // Recommended for static exports if not using a custom image loader
  },
  output: 'export',
  outputFileTracingIncludes: {
    '/**/*': ['./src/app/**/*.mdx'],
  },
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  trailingSlash: true,
};

export default withSearch(withMDX(nextConfig));
