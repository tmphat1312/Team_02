"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { auth } from "@/lib/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack } from "@/components/layout/stack";

const formSchema = z
  .object({
    currentPassword: z.string().min(1, {
      message: "Old password is required",
    }),
    newPassword: z.string().min(8, {
      message: "New password must be at least 8 characters",
    }),
    confirmPassword: z.string().min(8, {
      message: "Confirm password must be at least 8 characters",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
  });

export function UpdatePassword() {
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);
  const [isPending, startTransition] = React.useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      await auth.changePassword(
        {
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        },
        {
          onSuccess: () => {
            toast.success("Password updated successfully");
            setTimeout(() => {
              closeButtonRef.current?.click();
            }, 100);
          },
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
        }
      );
    });
  };

  const onDialogOpenChange = (open: boolean) => {
    if (!open) {
      form.reset();
    }
    form.clearErrors();
  };

  const isDirty = form.formState.isDirty;
  const isDisabled = !isDirty || isPending;

  return (
    <section>
      <Stack className="justify-between">
        <h4>Password</h4>
        <Dialog onOpenChange={onDialogOpenChange}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="lg" className="underline">
              Update
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-105">
            <DialogHeader>
              <DialogTitle>Update Password</DialogTitle>
              <DialogDescription>
                Enter your current password and your new password to update your
                password.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <Stack orientation="vertical" className="gap-5 mb-6">
                  <FormField
                    control={form.control}
                    name="currentPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            disabled={isPending}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="sr-only">
                          Your current password is required to update your
                          password.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            disabled={isPending}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="sr-only">
                          Enter your new password.
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
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            disabled={isPending}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="sr-only">
                          Confirm your new password.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </Stack>
                <Stack className="justify-end gap-4">
                  <DialogClose asChild ref={closeButtonRef}>
                    <Button
                      type="button"
                      size="lg"
                      variant="outline"
                      disabled={isPending}
                    >
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    type="submit"
                    variant="secondary"
                    disabled={isDisabled}
                  >
                    Update Password
                  </Button>
                </Stack>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </Stack>
    </section>
  );
}
