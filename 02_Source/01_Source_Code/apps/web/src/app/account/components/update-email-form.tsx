import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email(),
});

type UpdateEmailFormProps = {
  user: {
    email: string;
  };
};

export function UpdateEmailForm({ user }: UpdateEmailFormProps) {
  const [isPending, startTransition] = React.useTransition();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: user?.email || "",
    },
  });
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      await authClient.changeEmail(
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center justify-between"
      >
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

        <Button
          type="submit"
          className="bg-black/90 hover:bg-black/80"
          disabled={isDisabled}
        >
          Update Email
        </Button>
      </form>
    </Form>
  );
}
