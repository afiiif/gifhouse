import { GifResult } from '@giphy/js-fetch-api';
import { collection, FirestoreError, onSnapshot, query, where } from 'firebase/firestore';
import { create } from 'zustand';

import { db } from '@/utils/firebase';

type Gif = GifResult['data'];

export const useFavoriteGifsStore = create<{
  data: { id: string; gif: Gif }[] | null;
  isLoading: boolean;
  error: FirestoreError | null;
  updatedAt: number | null;
}>(() => ({
  data: null,
  isLoading: true,
  error: null,
  updatedAt: null,
}));

export const listenFavoriteGifs = (userId: string) => {
  const q = query<{ userId: string; gif: GifResult['data'] }>(
    // @ts-ignore
    collection(db, 'favorites'),
    where('userId', '==', userId),
  );
  const unsubscribe = onSnapshot(
    q,
    (querySnapshot) => {
      const gifs: { id: string; gif: Gif }[] = [];
      querySnapshot.forEach((doc) => {
        gifs.push({
          id: doc.id,
          gif: doc.data().gif,
        });
      });
      useFavoriteGifsStore.setState({ isLoading: false, data: gifs, updatedAt: Date.now() });
    },
    (error) => {
      useFavoriteGifsStore.setState({ isLoading: false, error });
    },
  );
  return unsubscribe;
};
