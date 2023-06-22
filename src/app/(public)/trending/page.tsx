import dynamic from 'next/dynamic';

const GifGrid = dynamic(() => import('./GifGrid'), { ssr: false });

export const metadata = {
  title: 'Trending GIFs | GifHouse+',
};

export default function TrendingPage() {
  return (
    <>
      <h1 className="pb-6 text-2xl font-bold">Trending GIFs</h1>
      <GifGrid />
    </>
  );
}
