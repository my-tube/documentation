import type { Metadata } from 'next';
import { ReactNode } from "react";

import glob from 'fast-glob'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'
import { type Section } from '@/components/SectionProvider'

import "@/style/app.css";

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
  const pages = await glob('**/*.mdx', { cwd: 'src/app' });

  const allSectionsEntries = (await Promise.all(
    pages.map(async (filename) => [
      '/' + filename.replace(/(^|\/)page\.mdx$/, ''),
      (await import(`./${filename}`)).sections,
    ]),
  )) as Array<[string, Array<Section>]>
  const allSections = Object.fromEntries(allSectionsEntries);

  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
    <body className="flex min-h-full bg-white antialiased dark:bg-zinc-900">
    <Providers>
      <div className="w-full">
        <Layout allSections={allSections}>
          {children}
        </Layout>
      </div>
    </Providers>
    </body>
    </html>
  );
}
