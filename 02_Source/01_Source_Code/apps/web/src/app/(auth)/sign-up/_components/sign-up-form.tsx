"use client";

import { AlertCircle, Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { OrSeparator } from "@/components/or-separator";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SocialSignIn } from "@/features/auth/components/social-sign-in";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z
  .object({
    email: z.string().email({
      message: "Please enter an valid email address.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    firstName: z.string().min(1, {
      message: "First name is required.",
    }),
    lastName: z.string().min(1, {
      message: "Last name is required.",
    }),
    confirmPassword: z.string().min(8, {
      message: "Confirm password must be at least 8 characters.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
  });

export default function SignUpForm() {
  const [errMsg, setErrMsg] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    form.subscribe({
      formState: { isDirty: true },
      callback: () => {
        setErrMsg("");
      },
    });
  }, [form]);

  function onSubmit({
    email,
    password,
    firstName,
    lastName,
  }: z.infer<typeof FormSchema>) {
    setErrMsg("");
    const name = `${firstName} ${lastName}`;
    startTransition(async () => {
      await authClient.signUp.email(
        { email, password, name },
        {
          onSuccess: () => {
            toast.success("Account created successfully!", {
              description: "Welcome aboard!",
            });
            form.reset();
            router.replace("/");
          },
          onError: (ctx) => {
            setErrMsg(ctx.error.message);
            form.setValue("password", "");
            form.setValue("confirmPassword", "");
            toast.error("Failed to sign up!", {
              description: ctx.error.message,
              position: "top-right",
            });
          },
        }
      );
    });
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 px-7 pt-6 mb-9"
        >
          <h2 className="text-[1.375rem] mb-5 font-medium">
            Create an Airbnb account
          </h2>

          {errMsg && (
            <Alert variant="destructive" className="border-destructive">
              <AlertCircle className="size-4" />
              <AlertTitle>Sign up failed: {errMsg}</AlertTitle>
            </Alert>
          )}

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">First Name</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="First name"
                        className="pl-10 py-6"
                        {...field}
                      />
                    </FormControl>
                    <User className="absolute left-3 top-[1.5625rem] transform -translate-y-1/2 size-5 text-gray-400" />
                  </div>
                  <FormDescription className="sr-only">
                    Enter your first name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Last Name</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Last name"
                        className="pl-10 py-6"
                        {...field}
                      />
                    </FormControl>
                    <User className="absolute left-3 top-[1.5625rem] transform -translate-y-1/2 size-5 text-gray-400" />
                  </div>
                  <FormDescription className="sr-only">
                    Enter your last name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Email</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      placeholder="Email"
                      className="pl-10 py-6"
                      inputMode="email"
                      autoComplete="email"
                      {...field}
                    />
                  </FormControl>
                  <Mail className="absolute left-3 top-[1.5625rem] transform -translate-y-1/2 size-5 text-gray-400" />
                </div>
                <FormDescription className="sr-only">
                  Enter your email address.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Password</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Password"
                      className="pl-10 py-6"
                      {...field}
                    />
                  </FormControl>
                  <Lock className="absolute left-3 top-[1.5625rem] transform -translate-y-1/2 size-5 text-gray-400" />
                </div>
                <FormDescription className="sr-only">
                  Enter your password.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Confirm Password</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm password"
                      className="pl-10 py-6"
                      {...field}
                    />
                  </FormControl>
                  <Lock className="absolute left-3 top-[1.5625rem] transform -translate-y-1/2 size-5 text-gray-400" />
                </div>
                <FormDescription className="sr-only">
                  Confirm your password.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="text-xs text-gray-500">
            By signing up, you agree to our{" "}
            <Link href="#" className="underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="underline">
              Privacy Policy
            </Link>
            .
          </div>

          <Button
            type="submit"
            className="w-full py-6 bg-airbnb hover:bg-airbnb-hover cursor-pointer"
            disabled={isPending}
          >
            {isPending ? "Creating account..." : "Create account"}
          </Button>
        </form>
      </Form>

      <OrSeparator />
      <SocialSignIn />
    </div>
  );
}
