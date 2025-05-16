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

const formSchema = z.object({
  email: z.string().email(),
});

type Props = {
  user: User;
};

export function UpdateEmail({ user }: Props) {
  const [isPending, startTransition] = React.useTransition();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: user.email,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      await auth.changeEmail(
        {
          newEmail: values.email,
        },
        {
          onSuccess: () => {
            toast.success("Email updated successfully");
            form.reset(values);
          },
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
        }
      );
    });
  };

  const isDirty = form.formState.isDirty;
  const isDisabled = !isDirty || isPending;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Stack className="justify-between">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="max-w-sm ">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" disabled={isPending} {...field} />
                </FormControl>
                <FormDescription>
                  This is the email address associated with your account.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isDisabled} variant={"secondary"}>
            Update Email
          </Button>
        </Stack>
      </form>
    </Form>
  );
}
