import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut as signOutFirebase,
} from 'firebase/auth';
import { collection, doc, getFirestore, query, where } from 'firebase/firestore';

import { IGif } from '@/types';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: 'gifhouse-96c71.firebaseapp.com',
  projectId: 'gifhouse-96c71',
  storageBucket: 'gifhouse-96c71.appspot.com',
  messagingSenderId: '212417265929',
  appId: '1:212417265929:web:cd382f0221d04015cd13d8',
  measurementId: 'G-5SB11Q0N6L',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export const signUp = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password);

export const signIn = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

export const signOut = () => signOutFirebase(auth);

export const queryFavorites = (userId: string) => {
  const q = query<{ userId: string; gif: IGif }>(
    // @ts-ignore
    collection(db, 'favorites'),
    where('userId', '==', userId),
  );
  return q;
};

export const querySharingLink = (userId: string) => doc(db, 'sharing-links', userId);
