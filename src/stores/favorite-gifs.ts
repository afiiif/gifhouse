import { FirestoreError, onSnapshot } from 'firebase/firestore';
import { create } from 'zustand';

import { IGif } from '@/types';
import { queryFavorites, querySharingLink } from '@/utils/firebase';

export const useFavoriteGifsStore = create<{
  data: { id: string; gif: IGif }[] | null;
  isLoading: boolean;
  error: FirestoreError | null;
  updatedAt: number | null;
  sharedLink: string | null;
}>(() => ({
  data: null,
  isLoading: true,
  error: null,
  updatedAt: null,
  sharedLink: null,
}));

export const listenFavoriteGifs = (userId: string) => {
  const unsubFavorites = onSnapshot(
    queryFavorites(userId),
    (querySnapshot) => {
      const gifs: { id: string; gif: IGif }[] = [];
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
  const unsubSharingLinks = onSnapshot(querySharingLink(userId), (snapshot) => {
    useFavoriteGifsStore.setState({ sharedLink: snapshot.exists() ? snapshot.data().url : null });
  });

  return () => {
    unsubFavorites();
    unsubSharingLinks();
  };
};
