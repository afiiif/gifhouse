import { User } from 'firebase/auth';
import { create } from 'zustand';

import { auth } from '@/utils/firebase';

export const useAuthStore = create<{
  user: User | null;
  isLoading: boolean;
  error: Error | null;
}>(() => ({
  user: null,
  isLoading: true,
  error: null,
}));

export const listenAuth = () =>
  auth.onAuthStateChanged(
    (user) => {
      useAuthStore.setState({ user, isLoading: false });
    },
    (error) => {
      useAuthStore.setState({ error, isLoading: false });
    },
  );
