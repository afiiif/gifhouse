'use client';

import { FormEventHandler } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { IconSearch } from '@tabler/icons-react';
import clsx from 'clsx';

type Props = {
  keyword?: string | null;
  onSubmit?: FormEventHandler<HTMLFormElement>;
};
export function SearchBarDumbComponent({ keyword, onSubmit }: Props) {
  return (
    <div
      className={clsx(
        'pointer-events-none fixed left-0 top-0 z-30 flex w-full items-center justify-center transition-all',
        keyword ? 'h-52 pb-0 pt-1 md:pl-52 lg:pl-56 lg:pr-96 lg:pt-2' : 'h-full',
      )}
    >
      <form
        onSubmit={onSubmit}
        className={clsx(
          'relative mb-36 w-full px-4 transition-all [&>*]:pointer-events-auto',
          keyword ? 'max-w-full lg:max-w-xl' : 'max-w-xl',
        )}
      >
        <input
          type="search"
          name="q"
          defaultValue={keyword as string}
          className={clsx(
            'w-full rounded-full bg-zinc-200 pr-14 transition-all',
            keyword ? 'py-2.5 pl-6' : 'py-4 pl-7',
          )}
          placeholder="Search GIFs"
        />
        <button
          type="submit"
          className={clsx('absolute right-4 top-0 rounded-r-full p-4', keyword && 'py-2.5')}
        >
          <IconSearch />
        </button>
      </form>
    </div>
  );
}

export default function SearchBar() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('q');

  const { push } = useRouter();

  return (
    <SearchBarDumbComponent
      keyword={keyword}
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const q = (formData.get('q') as string).trim();
        push(q ? `/?q=${encodeURIComponent(q)}` : '/');
      }}
    />
  );
}
