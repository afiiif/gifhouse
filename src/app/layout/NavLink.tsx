'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

type Props = Parameters<typeof Link>[0] & {
  activeClassName?: string;
};
export default function NavLink({
  children,
  href,
  className,
  activeClassName,
  ...linkProps
}: Props) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link className={clsx(className, isActive && activeClassName)} href={href} {...linkProps}>
      {children}
    </Link>
  );
}
