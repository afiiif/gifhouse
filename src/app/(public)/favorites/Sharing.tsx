'use client';

import { useId } from 'react';
import Link from 'next/link';
import { deleteDoc, setDoc } from 'firebase/firestore';

import { useAuthStore } from '@/stores/auth';
import { useFavoriteGifsStore } from '@/stores/favorite-gifs';
import { querySharingLink } from '@/utils/firebase';

export default function Sharing() {
  const link = useFavoriteGifsStore((state) => state.sharedLink);
  const href = `${window.location.origin}/c/${link}`;

  const idCheckbox = useId();

  return (
    <>
      <label htmlFor={idCheckbox} className="mb-10 flex cursor-pointer gap-4">
        <div className="relative inline-flex h-6 cursor-pointer items-center">
          <input
            id={idCheckbox}
            checked={!!link}
            onChange={() => {
              const user = useAuthStore.getState().user!;
              if (link) {
                deleteDoc(querySharingLink(user.uid));
                return;
              }
              setDoc(querySharingLink(user.uid), {
                url: `${user.uid}-${Date.now()}`,
                createdAt: new Date(),
                author: { email: user.email },
              });
            }}
            type="checkbox"
            className="peer sr-only"
          />
          <div className="h-6 w-11 rounded-full bg-zinc-400 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-fuchsia-600 peer-checked:after:translate-x-full peer-focus:ring-4 peer-focus:ring-fuchsia-300" />
        </div>
        <p className="flex-1">Allow anyone with the link to view your favorite GIFs</p>
      </label>

      {link && (
        <div className="-mt-5 mb-10 flex flex-wrap gap-2 rounded-md border bg-zinc-50 p-3">
          <div>Your sharing link:</div>
          <Link href={href} className="link break-all">
            {href}
          </Link>
        </div>
      )}
    </>
  );
}
