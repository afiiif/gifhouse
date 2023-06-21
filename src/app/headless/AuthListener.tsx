'use client';

import { useEffect } from 'react';

import { listenAuth } from '@/stores/auth';

export default function AuthListener() {
  useEffect(listenAuth, []);
  return null;
}
