import { Suspense } from 'react';

import SearchBar, { SearchBarDumbComponent } from './SearchBar';

export default function HomePage() {
  return (
    <Suspense
      // https://nextjs.org/docs/messages/deopted-into-client-rendering
      fallback={<SearchBarDumbComponent />}
    >
      <SearchBar />
    </Suspense>
  );
}
