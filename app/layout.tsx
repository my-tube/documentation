import type { Metadata } from 'next';

import { ReactNode } from "react";

import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';

import "@/style/app.css";

import { roboto } from '@/style/fonts';


export const metadata: Metadata = {
  description: 'MyTube Documentation',
  metadataBase: new URL(process.env.BASE_URL as string),
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

function staticUrl(path:string) {
  const basePath = process.env.NODE_ENV === 'production' ? '/documentation' : ''
  return basePath + path;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <body className={cn(
        'bg-white dark:bg-zinc-900 dark:text-white',
        'antialiased', roboto.className
      )}>
        <header>
          <nav className="flex items-center fixed top-0 inset-x-0 z-10 p-4 dark:bg-zinc-800 justify-between">
            <Link href="/">
              <Image
                alt="MyTube Logo"
                className="w-50"
                priority
                width={512}
                height={130}
                src={staticUrl('/app-logo.png')}
                unoptimized
              />
            </Link>
          </nav>
        </header>

        <div className="mx-auto max-w-7xl min-h-svh flex flex-col px-6 pt-28 pb-6">
          { children }
        </div>
      </body>
    </html>
  );
}
