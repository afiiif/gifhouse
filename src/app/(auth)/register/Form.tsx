'use client';

import { useId, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useAuthStore } from '@/stores/auth';
import { signUp } from '@/utils/firebase';

export default function Form() {
  const idEmail = useId();
  const idPassword = useId();

  const [{ isLoading, errorMsg }, setRegisterMutation] = useState({
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
        setRegisterMutation({ isLoading: true, errorMsg: '' });
        signUp(email, password)
          .then(({ user }) => {
            setRegisterMutation({ isLoading: false, errorMsg: '' });
            useAuthStore.setState({ user });
            router.replace('/account');
          })
          .catch((error) => {
            setRegisterMutation({ isLoading: false, errorMsg: error.message });
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
        {isLoading ? 'Registering...' : 'Register'}
      </button>
      <div className="pt-4 text-red-500 empty:hidden">{errorMsg}</div>
      <div className="pt-8">
        Already have an account?{' '}
        <Link href="/login" className="link">
          Login
        </Link>
      </div>
    </form>
  );
}
