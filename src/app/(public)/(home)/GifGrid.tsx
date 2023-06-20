'use client';

import { useSearchParams } from 'next/navigation';
import { Grid } from '@giphy/react-components';
import { IconMoodEmptyFilled } from '@tabler/icons-react';

import { useGifGridConfig } from '@/hooks/use-gif-grid-config';
import { giphyFetch } from '@/utils/giphy';

/* eslint-disable react/no-unstable-nested-components */
export default function GifGrid() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('q');

  const { width, columns, limit, isFetched, setIsFetched } = useGifGridConfig();

  if (!keyword) {
    return null;
  }

  return (
    <Grid
      key={keyword}
      fetchGifs={(offset: number) => giphyFetch.search(keyword, { offset, limit })}
      // Workaround to force trigger intersection-observer when grid items are too few (can't scroll to trigger)
      onGifsFetched={() => setIsFetched(true)}
      loader={isFetched ? () => <div className="mt-32" /> : undefined}
      loaderConfig={{ threshold: 1 }}
      width={width}
      columns={columns}
      gutter={12}
      noResultsMessage={
        <div className="py-20 text-center lg:py-32">
          <IconMoodEmptyFilled className="mx-auto text-zinc-300" size={96} />
          <div className="pt-6 text-red-500">
            Whoops, no results found for "<i>{keyword}</i>"
          </div>
        </div>
      }
    />
  );
}
/* eslint-enable react/no-unstable-nested-components */
