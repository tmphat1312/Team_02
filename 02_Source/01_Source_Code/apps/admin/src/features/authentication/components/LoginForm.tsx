import { useState, useTransition } from 'react';
import { RegisterOptions, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { addToast, Button, Form, Input } from '@heroui/react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

import { authClient } from '../../../lib/auth-client';

type Inputs = {
  email: string;
  password: string;
};

const validationRules: {
  email: RegisterOptions<Inputs, 'email'>;
  password: RegisterOptions<Inputs, 'password'>;
} = {
  email: {
    required: 'Email is required',
    pattern: {
      value: /\S+@\S+\.\S+/,
      message: 'Invalid email address',
    },
  },
  password: {
    required: 'Password is required',
    minLength: {
      value: 8,
      message: 'Password must be at least 8 characters long',
    },
  },
};

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isPending, startTransition] = useTransition();

  const toggleVisibility = () => setIsVisible((prev) => !prev);

  const onSubmit: SubmitHandler<Inputs> = ({ email, password }) => {
    startTransition(async () => {
      await authClient.signIn.email(
        { email, password },
        {
          onSuccess: () => {
            navigate('/dashboard');
          },
          onError: (ctx) => {
            addToast({
              title: ctx.error.message,
              color: 'danger',
            });
          },
        }
      );
    });
  };

  return (
    <section className="w-[42ch]">
      <h2 className="sr-only">Login to admin account</h2>
      <Form className="w-full max-w-xs" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Email Address"
          description="Admin email address"
          placeholder="e.g. admin@rento.com"
          autoComplete="email"
          inputMode="email"
          className="mb-2"
          labelPlacement="outside"
          variant="bordered"
          isRequired
          isClearable
          errorMessage={errors.email?.message}
          isInvalid={!!errors.email}
          {...register('email', validationRules.email)}
        />
        <Input
          label="Password"
          description="Password must be at least 8 characters long"
          placeholder="Enter your password"
          type={isVisible ? 'text' : 'password'}
          className="mb-4"
          labelPlacement="outside"
          variant="bordered"
          isRequired
          {...register('password', validationRules.password)}
          errorMessage={errors.password?.message}
          isInvalid={!!errors.password}
          endContent={
            <button
              aria-label="toggle password visibility"
              className="focus:outline-hidden"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <EyeIcon className="text-sm text-default-400" />
              ) : (
                <EyeOffIcon className="text-sm text-default-400" />
              )}
            </button>
          }
        />
        <Button
          type="submit"
          isLoading={isPending}
          variant="solid"
          className="w-full"
          color="primary"
        >
          Login
        </Button>
      </Form>
    </section>
  );
}
