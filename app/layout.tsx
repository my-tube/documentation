import type { Metadata } from 'next';
import { ReactNode } from "react";

import { cn } from '@/lib/utils';

import Image from 'next/image';
import Link from 'next/link';


import "@/style/app.css";

import { roboto } from '@/style/fonts';
import AppLogo from '@/media/app-logo.png';


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


export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <body className={cn(
        'bg-white dark:bg-zinc-900 dark:text-white',
        'antialiased', roboto.className
      )}>
        <nav className={cn(
          'fixed top-0 inset-x-0 z-10 h-18',
          'flex items-center p-4 justify-between',
          'dark:bg-zinc-800',
        )}>
          <Link href="/" className="h-full">
            <Image
              alt="MyTube Logo"
              className="h-full w-auto"
              priority
              width={238}
              height={64}
              src={AppLogo}
              unoptimized
            />
          </Link>
        </nav>

        <div className={cn(
          'flex flex-col px-6 pb-6 pt-18',
          'mx-auto max-w-5xl min-h-svh',
        )}>
          { children }
        </div>
      </body>
    </html>
  );
}
