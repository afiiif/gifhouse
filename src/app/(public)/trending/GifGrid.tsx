'use client';

import { Grid } from '@giphy/react-components';

import { useGifGridConfig } from '@/hooks/use-gif-grid-config';
import { giphyFetch } from '@/utils/giphy';

/* eslint-disable react/no-unstable-nested-components */
export default function GifGrid() {
  const { width, columns, limit, isFetched, setIsFetched } = useGifGridConfig();

  return (
    <Grid
      fetchGifs={(offset: number) => giphyFetch.trending({ offset, limit })}
      // Workaround to force trigger intersection-observer when grid items are too few (can't scroll to trigger)
      onGifsFetched={() => setIsFetched(true)}
      loader={isFetched ? () => <div className="mt-32" /> : undefined}
      loaderConfig={{ threshold: 1 }}
      width={width}
      columns={columns}
      gutter={12}
    />
  );
}
/* eslint-enable react/no-unstable-nested-components */
