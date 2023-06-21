'use client';

import Link from 'next/link';

import { useAuthStore } from '@/stores/auth';

import GifGrid from './GifGrid';

export default function FavoritesPage() {
  const { isLoading, user } = useAuthStore();

  if (isLoading) {
    return 'Checking your account...';
  }

  if (!user) {
    return (
      <>
        <h1 className="pb-6 text-2xl font-bold">My Favorites</h1>
        <p className="pb-8">Please log in to your account before adding items to your favorites.</p>
        <Link
          href="/login"
          className="rounded bg-fuchsia-600 px-6 py-2 text-white hover:bg-fuchsia-500 focus:bg-fuchsia-700"
        >
          Login
        </Link>
      </>
    );
  }

  return (
    <>
      <h1 className="pb-6 text-2xl font-bold">My Favorites</h1>
      <GifGrid />
    </>
  );
}
