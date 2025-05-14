"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Stack } from "@/components/layout/stack";
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
import { auth } from "@/lib/auth";
import { User } from "@/typings/models";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
  user: User;
};

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Full name is required",
  }),
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
});

export function UpdatePersonalInfo({ user }: Props) {
  const [isPending, startTransition] = React.useTransition();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name,
      phoneNumber: user.phoneNumber || "",
      address: user.address || "",
    },
  });
  const isDirty = form.formState.isDirty;

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      await auth.updateUser(
        {
          name: values.name,
          phoneNumber: values.phoneNumber,
          address: values.address,
        },
        {
          onSuccess: () => {
            toast.success("User updated successfully");
            form.reset(values);
          },
          onError: (ctx) => {
            toast.error(
              ctx.error.message || "An error occurred while updating the user"
            );
          },
        }
      );
    });
  }
  function onDiscard(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    form.reset();
  }

  return (
    <section>
      <h3 className="mb-4 text-2xl">Personal Information</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} onReset={onDiscard}>
          <div className="grid grid-cols-2 gap-8 mb-8">
            <FormField
              control={form.control}
              name="name"
              disabled={isPending}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the name on your travel document.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              disabled={isPending}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. 0933775220" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the phone number to use for direct contact.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              disabled={isPending}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Ben Luc, Long An, Vietnam"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is the address associated with your account.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Stack className="justify-end gap-4">
            <Button
              type="reset"
              size="lg"
              variant="outline"
              disabled={isPending || !isDirty}
            >
              Discard Changes
            </Button>
            <Button
              size="lg"
              disabled={isPending || !isDirty}
              variant={"secondary"}
            >
              Save Changes
            </Button>
          </Stack>
        </form>
      </Form>
    </section>
  );
}
