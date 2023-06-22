import { GifResult } from '@giphy/js-fetch-api';
import { collection, doc, FirestoreError, onSnapshot, query, where } from 'firebase/firestore';
import { create } from 'zustand';

import { db } from '@/utils/firebase';

type Gif = GifResult['data'];

export const useFavoriteGifsStore = create<{
  data: { id: string; gif: Gif }[] | null;
  isLoading: boolean;
  error: FirestoreError | null;
  updatedAt: number | null;
  sharingLink: { id: string; link: string } | null;
}>(() => ({
  data: null,
  isLoading: true,
  error: null,
  updatedAt: null,
  sharingLink: null,
}));

export const listenFavoriteGifs = (userId: string) => {
  const q = query<{ userId: string; gif: GifResult['data'] }>(
    // @ts-ignore
    collection(db, 'favorites'),
    where('userId', '==', userId),
  );
  const unsubFavorites = onSnapshot(
    q,
    (querySnapshot) => {
      const gifs: { id: string; gif: Gif }[] = [];
      querySnapshot.forEach((snapshot) => {
        gifs.push({
          id: snapshot.id,
          gif: snapshot.data().gif,
        });
      });
      useFavoriteGifsStore.setState({ isLoading: false, data: gifs, updatedAt: Date.now() });
    },
    (error) => {
      useFavoriteGifsStore.setState({ isLoading: false, error });
    },
  );
  const unsubSharingLinks = onSnapshot(doc(db, 'sharing-links', userId), (snapshot) => {
    useFavoriteGifsStore.setState({
      sharingLink: snapshot.exists() ? { id: snapshot.id, link: userId } : null,
    });
  });

  return () => {
    unsubFavorites();
    unsubSharingLinks();
  };
};
