import { useRef, useState, useTransition } from 'react';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';

import { AdminIcon } from '../components/icons/Admin';
import { Logo } from '../components/Logo';
import { authClient } from '../lib/auth-client';

export function Login() {
  return (
    <div className="flex rounded-lg bg-white shadow-lg">
      <LeftSection />
      <RightSection />
    </div>
  );
}

export function LeftSection() {
  return (
    <section className="max-w-[40ch] rounded-lg bg-indigo-600 px-8 py-14 text-white">
      <p className="sr-only">Rento administrator application</p>
      <h1 aria-hidden className="mb-3.5 text-3xl font-medium">
        Welcome
      </h1>
      <p aria-hidden className="mb-8 text-sm">
        Welcome to the administrator application for the Rento platform. This
        site is designed exclusively for authorized users who manage and oversee
        the operations of the Rento application. Please ensure that you have the
        proper credentials to access this portal.
      </p>
      <AdminIcon />
    </section>
  );
}

export function RightSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const [msg, setMsg] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(formRef.current!);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    startTransition(async () => {
      await authClient.signIn.email({
        email,
        password,
        callbackURL: '/users',
        fetchOptions: {
          onError: (ctx) => {
            setMsg(ctx.error.message);
          },
        },
      });
    });
  };

  return (
    <section className="w-[42ch] space-y-6 p-12">
      <Logo />
      <h2 className="sr-only">Login to admin account</h2>
      {msg && (
        <div className="mb-2.5">
          <Message severity="error" text={msg} className="w-full" />
        </div>
      )}
      <form onSubmit={handleSubmit} ref={formRef}>
        <div className="mb-4 flex flex-col gap-2">
          <label htmlFor="email" className="space-x-0.5 text-sm">
            <span aria-hidden>*</span>
            <span className="sr-only">Email is required</span>
            <span>Email Address</span>
          </label>
          <InputText
            required
            type="email"
            inputMode="email"
            id="email"
            name="email"
            aria-describedby="email-help"
            className="p-inputtext-sm"
          />
          <small id="email-help" className="sr-only">
            Your email address. It is required.
          </small>
        </div>
        <div className="mb-6 flex flex-col gap-2">
          <label htmlFor="password" className="space-x-0.5 text-sm">
            <span aria-hidden>*</span>
            <span className="sr-only">Password is required</span>
            <span>Password</span>
          </label>
          <InputText
            required
            type="password"
            id="password"
            name="password"
            minLength={8}
            aria-describedby="password-help"
            className="p-inputtext-sm"
          />
          <small id="password-help" className="sr-only">
            Your password. It is required.
          </small>
        </div>
        <div className="text-center">
          <Button
            className="px-4"
            size="small"
            loading={isPending}
            icon="pi pi-sign-in"
            label="Login"
          />
        </div>
      </form>
    </section>
  );
}
