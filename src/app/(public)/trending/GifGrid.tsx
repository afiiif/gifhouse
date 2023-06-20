'use client';

import { Grid } from '@giphy/react-components';

import { useGifGridConfig } from '@/hooks/use-gif-grid-config';
import { giphyFetch } from '@/utils/giphy';

export default function GifGrid() {
  const { width, columns, limit } = useGifGridConfig();

  return (
    <Grid
      fetchGifs={(offset: number) => giphyFetch.trending({ offset, limit })}
      width={width}
      columns={columns}
      gutter={12}
    />
  );
}
