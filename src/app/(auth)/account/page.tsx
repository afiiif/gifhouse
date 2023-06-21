'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useAuthStore } from '@/stores/auth';
import { signOut } from '@/utils/firebase';

export default function AccountPage() {
  const router = useRouter();

  const { isLoading, user } = useAuthStore();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/');
    }
  }, [isLoading, user, router.replace]);

  if (!user) {
    return 'Checking your account...';
  }

  return (
    <>
      <h1 className="pb-6 text-2xl font-bold">Account</h1>

      <button
        type="button"
        className="rounded bg-fuchsia-600 px-6 py-2 text-white hover:bg-fuchsia-500 focus:bg-fuchsia-700"
        onClick={() =>
          signOut().then(() => {
            router.replace('/');
          })
        }
      >
        Logout
      </button>
    </>
  );
}
