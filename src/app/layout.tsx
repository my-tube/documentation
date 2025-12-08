import type { Metadata } from 'next';
import { ReactNode } from "react";

import glob from 'fast-glob'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'
import { type Section } from '@/components/SectionProvider'

import { cn } from '@/lib/utils';

import Image from 'next/image';
import Link from 'next/link';

import "@/style/app.css";

import { roboto } from '@/style/fonts';
import AppLogo from '@/media/app-logo.png';


export const metadata: Metadata = {
  description: 'MyTube Documentation',
  metadataBase: new URL(process.env.BASE_URL!),
  title: {
    default: 'MyTube Documentation',
    template: '%s | MyTube Documentation',
  },
  openGraph: {
    images: ['/public/android-chrome-512x512.png'],
  },
  twitter: {
    card: 'summary',
    images: ['/public/android-chrome-512x512.png'],
  }
};

interface RootLayoutProps {
  children: ReactNode;
}


export default async function RootLayout({ children }: RootLayoutProps) {
  let pages = await glob('**/*.mdx', { cwd: 'src/app' })
  let allSectionsEntries = (await Promise.all(
    pages.map(async (filename) => [
      '/' + filename.replace(/(^|\/)page\.mdx$/, ''),
      (await import(`./${filename}`)).sections,
    ]),
  )) as Array<[string, Array<Section>]>
  let allSections = Object.fromEntries(allSectionsEntries)

  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
    <body className="flex min-h-full bg-white antialiased dark:bg-zinc-900">
    <Providers>
      <div className="w-full">
        <Layout allSections={allSections}>{children}</Layout>
      </div>
    </Providers>
    </body>
    </html>
  );
}
