'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { IconPhotoHeart } from '@tabler/icons-react';
import clsx from 'clsx';

type Props = {
  keyword?: string | null;
};
export function HomeLinkDumbComponent({ keyword }: Props) {
  return (
    <Link
      href="/"
      className={clsx(
        'animate__animated animate__bounceIn group relative mr-auto flex items-center p-1.5 text-2xl transition-all',
        keyword ? '-top-14 md:top-0' : 'top-0',
      )}
    >
      <IconPhotoHeart size={32} className="-rotate-6 transition-transform group-hover:rotate-12" />
      <span className="pl-2 font-bold">GIF</span>
      <span>HOUSE</span>
      <span className="font-bold">+</span>
    </Link>
  );
}

export default function HomeLink() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('q');

  return <HomeLinkDumbComponent keyword={keyword} />;
}
