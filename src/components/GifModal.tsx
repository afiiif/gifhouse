import { Dispatch, SetStateAction, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { GifResult } from '@giphy/js-fetch-api';
import { Gif } from '@giphy/react-components';
import { IconCircleX, IconHeart, IconHeartOff } from '@tabler/icons-react';
import clsx from 'clsx';
import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore';

import { useAuthStore } from '@/stores/auth';
import { useFavoriteGifsStore } from '@/stores/favorite-gifs';
import { db } from '@/utils/firebase';

type Props = {
  modalGif: GifResult['data'];
  setModalGif: Dispatch<SetStateAction<GifResult['data'] | undefined>>;
};
export default function GifModal({ modalGif, setModalGif }: Props) {
  useEffect(() => {
    const onEscKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setModalGif(undefined);
      }
    };
    window.addEventListener('keydown', onEscKeydown);
    return () => window.removeEventListener('keydown', onEscKeydown);
  }, [setModalGif]);

  const router = useRouter();

  const favorited = useFavoriteGifsStore((state) =>
    state.data?.find((item) => item.gif.id === modalGif.id),
  );

  const { width, height } = modalGif.images.original;

  const contentWidth = Math.min(window.innerWidth, 1248);
  const contentPadding = window.innerWidth < 768 ? 32 : 240;
  const gifWidth = contentWidth - contentPadding;
  const gifHeight = (gifWidth / width) * height;

  const gifProps =
    gifHeight > window.innerHeight - 250
      ? { height: window.innerHeight - 250, width: ((window.innerHeight - 250) / height) * width }
      : { width: gifWidth };

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center">
      <button
        type="button"
        aria-label="Modal overlay"
        className="absolute inset-0 flex w-full flex-col items-end bg-black/90 p-6 text-white"
        onClick={() => setModalGif(undefined)}
      >
        <IconCircleX size={36} />
        <div className="hidden w-9 pt-1.5 text-center lg:block">ESC</div>
      </button>
      <div className="relative pb-6">
        <Gif gif={modalGif} {...gifProps} noLink />
        <button
          type="button"
          className={clsx(
            'mt-4 flex w-full items-center justify-center gap-2 rounded border-2 border-white p-2 text-white',
            favorited ? 'hover:border-orange-600' : 'hover:border-pink-600',
          )}
          onClick={() => {
            const { user } = useAuthStore.getState();
            if (!user) {
              router.push('/login');
              return;
            }
            if (favorited) {
              deleteDoc(doc(db, 'favorites', favorited.id));
              return;
            }
            addDoc(collection(db, 'favorites'), {
              userId: user.uid,
              gif: modalGif,
            });
          }}
        >
          {favorited ? (
            <>
              <IconHeartOff className="text-orange-600" size={36} />
              <div>Remove favorites</div>
            </>
          ) : (
            <>
              <IconHeart className="text-pink-600" size={36} />
              <div>Add to favorites</div>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
