import GuestOnlyGuard from '@/app/headless/GuestOnlyGuard';

import Form from './Form';

export const metadata = {
  title: 'Register | GifHouse+',
};

export default function RegisterPage() {
  return (
    <section className="mx-auto max-w-sm sm:pt-6 lg:pt-14">
      <h1 className="pb-6 text-2xl font-bold lg:pb-8 lg:text-center">Register</h1>
      <Form />
      <GuestOnlyGuard />
    </section>
  );
}
