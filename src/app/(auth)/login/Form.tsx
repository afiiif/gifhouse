'use client';

import { useId, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useAuthStore } from '@/stores/auth';
import { signIn } from '@/utils/firebase';

export default function Form() {
  const idEmail = useId();
  const idPassword = useId();

  const [{ isLoading, errorMsg }, setLoginMutation] = useState({
    isLoading: false,
    errorMsg: '',
  });

  const router = useRouter();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        setLoginMutation({ isLoading: true, errorMsg: '' });
        signIn(email, password)
          .then(({ user }) => {
            setLoginMutation({ isLoading: false, errorMsg: '' });
            useAuthStore.setState({ user });
            router.replace('/account');
          })
          .catch((error) => {
            setLoginMutation({ isLoading: false, errorMsg: error.message });
          });
      }}
    >
      <label className="block pb-3" htmlFor={idEmail}>
        <div className="pb-1 font-medium">Email</div>
        <input
          id={idEmail}
          name="email"
          type="email"
          className="form-control"
          required
          readOnly={isLoading}
        />
      </label>
      <label className="block pb-3" htmlFor={idPassword}>
        <div className="pb-1 font-medium">Password</div>
        <input
          id={idPassword}
          name="password"
          type="password"
          className="form-control"
          required
          readOnly={isLoading}
        />
      </label>
      <button type="submit" disabled={isLoading} className="btn mt-4 w-full">
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
      <div className="pt-4 text-red-500 empty:hidden">{errorMsg}</div>
      <div className="pt-8">
        Don't have an account?{' '}
        <Link href="/register" className="link">
          Register
        </Link>
      </div>
    </form>
  );
}
