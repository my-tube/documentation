import Image from 'next/image';

import MytubeIcon from '@/images/icons/mytube.png';

export function Logo(props: React.ComponentPropsWithoutRef<'img'>) {
  return (
    <div className="flex gap-x-2 items-center">
      <Image
        {...props}
        alt="MyTube Logo"
        priority
        width={180}
        height={180}
        src={MytubeIcon}
        unoptimized
      />

      <span className="text-xl font-semibold text-zinc-900 dark:text-white">mytube.dev</span>
    </div>
  );
}
