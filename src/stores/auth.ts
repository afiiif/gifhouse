import { User } from 'firebase/auth';
import { create } from 'zustand';

export const useAuthStore = create<{
  user: User | null;
  isLoading: boolean;
}>(() => ({
  user: null,
  isLoading: true,
}));
