import type { NextConfig } from "next";

import createMDX from '@next/mdx';

import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeSlug from 'rehype-slug';

import { h } from "hastscript";


const nextConfig:NextConfig = {
  allowedDevOrigins: [
    'docs.mytube.mac',
  ],

  // assetPrefix: process.env.NODE_ENV === 'production' ? '/documentation/' : '',
  // basePath: process.env.NODE_ENV === 'production' ? '/documentation' : '',
  distDir: 'build',
  images: {
    unoptimized: true, // Recommended for static exports if not using a custom image loader
  },
  output: 'export',
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  trailingSlash: true,
};


const AUTOLINK_CONTENT = h('svg', {
    class: "size-4",
    fill: 'currentColor',
    viewBox: '0 0 24 24',
  }, [
    h('path', {
      clipRule: 'evenodd',
      fillRule: 'evenodd',
      d: 'M19.902 4.098a3.75 3.75 0 0 0-5.304 0l-4.5 4.5a3.75 3.75 0 0 0 1.035 6.037.75.75 0 0 1-.646 1.353 5.25 5.25 0 0 1-1.449-8.45l4.5-4.5a5.25 5.25 0 1 1 7.424 7.424l-1.757 1.757a.75.75 0 1 1-1.06-1.06l1.757-1.757a3.75 3.75 0 0 0 0-5.304Zm-7.389 4.267a.75.75 0 0 1 1-.353 5.25 5.25 0 0 1 1.449 8.45l-4.5 4.5a5.25 5.25 0 1 1-7.424-7.424l1.757-1.757a.75.75 0 1 1 1.06 1.06l-1.757 1.757a3.75 3.75 0 1 0 5.304 5.304l4.5-4.5a3.75 3.75 0 0 0-1.035-6.037.75.75 0 0 1-.354-1Z'
    })
  ]
);


const withMDX = createMDX({
  // Add markdown plugins here, as desired
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, {
        behavior: 'append',
        content: AUTOLINK_CONTENT,
        test: ['h2', 'h3'], // Only h2 and h3 will be processed
      }],
      [rehypeExternalLinks, { target: '_blank', rel: ['noopener']}],
    ],
  }
});

export default withMDX(nextConfig);
