import { useState } from 'react';
import { ResultMeta, ResultPagination } from '@giphy/js-fetch-api';
import { Grid } from '@giphy/react-components';

import GifModal from '@/components/GifModal';
import { useGifGridConfig } from '@/hooks/use-gif-grid-config';
import { IGif } from '@/types';

type Props = {
  gifs: IGif[];
};
export default function GifGrid({ gifs }: Props) {
  const { width, columns } = useGifGridConfig();
  const [modalGif, setModalGif] = useState<IGif>();

  return (
    <>
      <Grid
        initialGifs={gifs}
        fetchGifs={() =>
          Promise.resolve({
            data: gifs,
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
