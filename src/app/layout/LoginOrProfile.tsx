'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconHeart, IconLogin, IconUserCircle } from '@tabler/icons-react';
import clsx from 'clsx';

import { useAuthStore } from '@/stores/auth';

import NavLink from './NavLink';

export default function LoginOrProfile() {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return (
      <>
        <NavLink
          href="/login"
          className="flex gap-0.5 px-1 py-3"
          activeClassName="text-fuchsia-600 underline decoration-fuchsia-600 decoration-2 underline-offset-8"
        >
          <IconLogin />
          <div>Login</div>
        </NavLink>
        <div>/</div>
        <NavLink
          href="/register"
          className="px-1 py-3"
          activeClassName="text-fuchsia-600 underline decoration-fuchsia-600 decoration-2 underline-offset-8"
        >
          Register
        </NavLink>
      </>
    );
  }

  return (
    <>
      <NavLink
        href="/favorites"
        className="flex gap-1 px-4 py-3"
        activeClassName="text-fuchsia-600 underline decoration-fuchsia-600 decoration-2 underline-offset-8"
      >
        <IconHeart />
        <div>My Fav</div>
      </NavLink>
      <NavLink
        href="/account"
        className="flex gap-1 px-4 py-3"
        activeClassName="text-fuchsia-600 underline decoration-fuchsia-600 decoration-2 underline-offset-8"
      >
        <IconUserCircle />
        <div>Me</div>
      </NavLink>
    </>
  );
}

export function LoginOrProfileBottomNav({ children }: { children: ReactNode }) {
  const user = useAuthStore((state) => state.user);

  const pathname = usePathname();

  if (!user) {
    return (
      <Link
        href="/login"
        className={clsx(
          'relative flex w-full flex-col items-center p-3',
          (pathname === '/login' || pathname === '/register') &&
            'border-t-4 border-t-fuchsia-600 pt-2 text-fuchsia-600',
        )}
      >
        {children}
      </Link>
    );
  }

  return (
    <NavLink
      href="/account"
      className="relative flex w-full flex-col items-center p-3"
      activeClassName="border-t-4 pt-2 border-t-fuchsia-600 text-fuchsia-600"
    >
      {children}
    </NavLink>
  );
}
