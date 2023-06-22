'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import { getDoc, getDocs } from 'firebase/firestore';

import { IGif } from '@/types';
import { queryFavorites, querySharingLink } from '@/utils/firebase';

const GifGrid = dynamic(() => import('./GifGrid'));

const getSharedGifs = async (id: string) => {
  const authorUserId = id.split('-')[0];
  const [sharingResult, gifsResult] = await Promise.allSettled([
    getDoc(querySharingLink(authorUserId)).then(
      (snap) => snap.exists() && snap.data().author.email,
    ),
    getDocs(queryFavorites(authorUserId)).then((snap) => {
      const gifs: IGif[] = [];
      snap.forEach((snapshot) => {
        gifs.push(snapshot.data().gif);
      });
      return gifs;
    }),
  ]);
  if (
    sharingResult.status === 'fulfilled' &&
    sharingResult.value &&
    gifsResult.status === 'fulfilled'
  ) {
    return { gifs: gifsResult.value, author: sharingResult.value };
  }
  throw new Error('Not found');
};

export default function SharedGifsPage() {
  const { id } = useParams();

  const [sharedGifs, setSharedGifs] = useState<{ gifs: IGif[]; author: string } | Error>();

  useEffect(() => {
    getSharedGifs(id).then(setSharedGifs).catch(setSharedGifs);
  }, [id]);

  if (!sharedGifs) {
    return '⏳ Loading...';
  }

  if (sharedGifs instanceof Error) {
    return 'Page not found';
  }

  return (
    <>
      <h1 className="pb-2 text-2xl font-bold">Shared Gifs</h1>
      <div className="pb-8">
        By <span className="font-semibold text-fuchsia-600">{sharedGifs.author}</span>
      </div>
      <GifGrid gifs={sharedGifs.gifs} />
    </>
  );
}
