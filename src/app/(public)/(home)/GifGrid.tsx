'use client';

import { useSearchParams } from 'next/navigation';
import { Grid } from '@giphy/react-components';
import { IconMoodEmptyFilled } from '@tabler/icons-react';

import { useGifGridConfig } from '@/hooks/use-gif-grid-config';
import { giphyFetch } from '@/utils/giphy';

export default function GifGrid() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('q');

  const { width, columns, limit } = useGifGridConfig();

  if (!keyword) {
    return null;
  }

  return (
    <Grid
      key={keyword}
      fetchGifs={(offset: number) => giphyFetch.search(keyword, { offset, limit })}
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
