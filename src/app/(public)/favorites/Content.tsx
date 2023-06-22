'use client';

import Link from 'next/link';

import { useAuthStore } from '@/stores/auth';
import { useFavoriteGifsStore } from '@/stores/favorite-gifs';

import GifGrid from './GifGrid';
import Sharing from './Sharing';

export default function Content() {
  const { isLoading, user } = useAuthStore();
  const hasFavoritedGifs = useFavoriteGifsStore((state) => !!state.data?.length);

  if (isLoading) {
    return 'Checking your account...';
  }

  if (!user) {
    return (
      <>
        <h1 className="pb-6 text-2xl font-bold">My Favorites</h1>
        <p className="pb-8">Please log in to your account before adding items to your favorites.</p>
        <Link href="/login" className="btn">
          Login
        </Link>
      </>
    );
  }

  if (!hasFavoritedGifs) {
    return (
      <>
        <h1 className="pb-6 text-2xl font-bold">My Favorites</h1>
        <p className="pb-8">No GIFs added to favorites.</p>
        <Link href="/trending" className="btn">
          Explore Trending GIFs
        </Link>
      </>
    );
  }

  return (
    <>
      <h1 className="mr-auto pb-6 text-2xl font-bold">My Favorites</h1>
      <Sharing />
      <GifGrid />
    </>
  );
}
