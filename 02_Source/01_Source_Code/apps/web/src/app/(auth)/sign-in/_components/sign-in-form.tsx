"use client";

import { AlertCircle, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Alert, AlertTitle } from "@/components/ui/alert";

import { OrSeparator } from "@/components/or-separator";
import { SocialSignIn } from "@/components/social-sign-in";
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
import { authClient } from "@/lib/auth-client";

const FormSchema = z.object({
  email: z.string().email({
    message: "Please enter an valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export function SignInForm() {
  const [isPending, startTransition] = useTransition();
  const [errMsg, setErrMsg] = useState("");
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      setErrMsg("");
      await authClient.signIn.email(
        {
          email: data.email,
          password: data.password,
        },
        {
          onSuccess: () => {
            toast.success("Logged in successfully!", {
              description: "Welcome back!",
            });

            router.replace("/");
          },
          onError: (ctx) => {
            toast.error("Failed to log in!", {
              description: ctx.error.message,
              position: "top-right",
            });
            setErrMsg(ctx.error.message);
            form.setValue("password", "");
          },
        }
      );
    });
  }

  return (
    <section>
      <header className="text-center border-b p-5">
        <h1 className="font-medium">Log in</h1>
      </header>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 px-7 py-6"
        >
          <h2 className="text-[1.375rem] font-medium">Welcome to Airbnb</h2>

          {errMsg && (
            <Alert variant="destructive" className="border-destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Login failed: {errMsg}</AlertTitle>
            </Alert>
          )}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-3.5">
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
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-gray-400" />
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
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-gray-400" />
                </div>
                <FormDescription className="sr-only">
                  Enter your password.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full py-6 text-base bg-airbnb hover:bg-airbnb-hover cursor-pointer"
            disabled={isPending}
          >
            {isPending ? "Logging in..." : "Log in"}
          </Button>
        </form>
      </Form>

      <OrSeparator />
      <SocialSignIn />

      <footer className="text-center text-sm mb-6">
        Don{`'`}t have an account?{" "}
        <Link
          href="/sign-up"
          className="text-airbnb font-medium hover:underline"
        >
          Sign up
        </Link>
      </footer>
    </section>
  );
}
