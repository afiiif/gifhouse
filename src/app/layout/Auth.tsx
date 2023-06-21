'use client';

import { useEffect } from 'react';

import { useAuthStore } from '@/stores/auth';
import { auth } from '@/utils/firebase';

export default function Auth() {
  const authState = useAuthStore();
  console.info(authState);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      useAuthStore.setState({ user, isLoading: false });
    });
  }, []);

  return null;
}
