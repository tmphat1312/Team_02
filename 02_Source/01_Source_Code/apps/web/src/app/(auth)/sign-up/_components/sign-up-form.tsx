"use client";

import { Lock, Mail, User } from "lucide-react";
import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

  return (
    <section>
      <header className="text-center border-b p-5">
        <h1 className="font-semibold">Sign up</h1>
      </header>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => console.log(data))}
          className="space-y-4 px-7 py-6"
        >
          <h2 className="text-[1.375rem] mb-5 font-medium">
            Create an Airbnb account
          </h2>
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
          >
            Sign up
          </Button>
        </form>
      </Form>

      <OrSeparator />
      <SocialSignIn />

      <footer className="text-center text-sm mb-6">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="text-airbnb font-medium hover:underline"
        >
          Log in
        </Link>
      </footer>
    </section>
  );
}
