'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useAuthStore } from '@/stores/auth';

export default function GuestOnlyGuard() {
  const { isLoading, user } = useAuthStore();

  const { replace } = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      replace('/');
    }
  }, [isLoading, user, replace]);

  return null;
}
