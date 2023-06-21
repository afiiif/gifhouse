'use client';

import { useEffect } from 'react';

import { useAuthStore } from '@/stores/auth';
import { listenFavoriteGifs } from '@/stores/favorite-gifs';

export default function FavoriteGifsListener() {
  const userId = useAuthStore((state) => state.user?.uid);

  useEffect(() => {
    if (!userId) return undefined;
    return listenFavoriteGifs(userId);
  }, [userId]);

  return null;
}
