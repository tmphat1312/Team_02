import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';
import { useState, useTransition } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Logo } from '../../../components/Logo';
import { authClient } from '../../../lib/auth-client';

type Inputs = {
  email: string;
  password: string;
};

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [isPending, startTransition] = useTransition();
  const [msg, setMsg] = useState('');

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { email, password } = data;
    startTransition(async () => {
      await authClient.signIn.email({
        email,
        password,
        callbackURL: '/dashboard',
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4 flex flex-col gap-2">
          <label htmlFor="email" className="space-x-0.5 text-sm">
            <span aria-hidden>*</span>
            <span className="sr-only">Email is required</span>
            <span>Email Address</span>
          </label>
          <InputText
            type="email"
            inputMode="email"
            id="email"
            autoComplete="email"
            aria-describedby="email-help"
            className="p-inputtext-sm"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Invalid email address',
              },
            })}
          />
          <small id="email-help" className="sr-only">
            Your email address. It is required.
          </small>
          {errors.email && (
            <small className="text-xs text-red-500" role="alert">
              {errors.email.message}
            </small>
          )}
        </div>
        <div className="mb-6 flex flex-col gap-2">
          <label htmlFor="password" className="space-x-0.5 text-sm">
            <span aria-hidden>*</span>
            <span className="sr-only">Password is required</span>
            <span>Password</span>
          </label>
          <InputText
            type="password"
            id="password"
            aria-describedby="password-help"
            className="p-inputtext-sm"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters long',
              },
            })}
          />
          <small id="password-help" className="sr-only">
            Your password. It is required.
          </small>
          {errors.password && (
            <small className="text-xs text-red-500" role="alert">
              {errors.password.message}
            </small>
          )}
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
