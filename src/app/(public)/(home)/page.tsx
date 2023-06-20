import { Suspense } from 'react';
import dynamic from 'next/dynamic';

import SearchBar, { SearchBarDumbComponent } from './SearchBar';

const GifGrid = dynamic(() => import('./GifGrid'), { ssr: false });

export default function HomePage() {
  return (
    <Suspense
      // https://nextjs.org/docs/messages/deopted-into-client-rendering
      fallback={<SearchBarDumbComponent />}
    >
      <SearchBar />
      <GifGrid />
    </Suspense>
  );
}
