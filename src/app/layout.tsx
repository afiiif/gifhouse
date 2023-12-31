import './globals.css';

import { ReactNode, Suspense } from 'react';
import { IconHeart, IconSearch, IconSparkles, IconUser } from '@tabler/icons-react';

import AuthListener from './headless/AuthListener';
import FavoriteGifsListener from './headless/FavoriteGifsListener';
import HomeLink, { HomeLinkDumbComponent } from './layout/HomeLink';
import LoginOrProfile, { LoginOrProfileBottomNav } from './layout/LoginOrProfile';
import NavLink from './layout/NavLink';

export const metadata = {
  title: 'GifHouse+ | Discover GIFs from Giphy',
  description: 'Discover GIFs from Giphy',
};

type Props = {
  children: ReactNode;
};
export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body>
        <AuthListener />
        <FavoriteGifsListener />

        <nav className="pointer-events-none sticky top-0 z-30 w-full bg-white">
          <div className="mx-auto flex max-w-7xl items-center border-b px-3 py-3 lg:px-5 [&>*]:pointer-events-auto">
            <Suspense
              // https://nextjs.org/docs/messages/deopted-into-client-rendering
              fallback={<HomeLinkDumbComponent />}
            >
              <HomeLink />
            </Suspense>

            <div className="hidden items-center lg:flex">
              <NavLink
                href="/trending"
                className="flex gap-1 px-4 py-3"
                activeClassName="text-fuchsia-600 underline decoration-fuchsia-600 decoration-2 underline-offset-8"
              >
                <IconSparkles />
                <div>Trending</div>
              </NavLink>
              <LoginOrProfile />
            </div>
          </div>
        </nav>

        <nav className="fixed bottom-0 z-30 flex w-full justify-around border-t bg-white text-xs lg:hidden">
          <NavLink
            href="/"
            className="relative flex w-full flex-col items-center p-3"
            activeClassName="border-t-4 pt-2 border-t-fuchsia-600 text-fuchsia-600"
          >
            <IconSearch />
            <div className="pt-1">Search</div>
          </NavLink>
          <NavLink
            href="/trending"
            className="relative flex w-full flex-col items-center p-3"
            activeClassName="border-t-4 pt-2 border-t-fuchsia-600 text-fuchsia-600"
          >
            <IconSparkles />
            <div className="pt-1">Trending</div>
          </NavLink>
          <NavLink
            href="/favorites"
            className="relative flex w-full flex-col items-center p-3"
            activeClassName="border-t-4 pt-2 border-t-fuchsia-600 text-fuchsia-600"
          >
            <IconHeart />
            <div className="pt-1">My Fav</div>
          </NavLink>
          <LoginOrProfileBottomNav>
            <IconUser />
            <div className="pt-1">Account</div>
          </LoginOrProfileBottomNav>
        </nav>

        <main className="mx-auto max-w-7xl px-4 py-8">{children}</main>
        <div className="pt-16" />
      </body>
    </html>
  );
}
