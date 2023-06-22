'use client';

import { useState } from 'react';
import { ResultMeta, ResultPagination } from '@giphy/js-fetch-api';
import { Grid } from '@giphy/react-components';

import GifModal from '@/components/GifModal';
import { useGifGridConfig } from '@/hooks/use-gif-grid-config';
import { useFavoriteGifsStore } from '@/stores/favorite-gifs';
import { IGif } from '@/types';

export default function GifGrid() {
  const { width, columns } = useGifGridConfig();

  const favoritedGifs = useFavoriteGifsStore((state) => state.data?.map((item) => item.gif) || []);
  const updatedAt = useFavoriteGifsStore((state) => state.updatedAt);

  const [modalGif, setModalGif] = useState<IGif>();

  return (
    <>
      <Grid
        key={updatedAt}
        initialGifs={favoritedGifs}
        fetchGifs={() =>
          Promise.resolve({
            data: favoritedGifs,
            meta: {} as ResultMeta,
            pagination: {} as ResultPagination,
          })
        }
        width={width}
        columns={columns}
        gutter={12}
        noLink
        className="[&_picture]:cursor-pointer"
        onGifClick={(gif) => setModalGif(gif)}
      />

      {modalGif && <GifModal modalGif={modalGif} setModalGif={setModalGif} />}
    </>
  );
}
