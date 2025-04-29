"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";

const FormSchema = z.object({
  otp: z.string().min(6, {
    message: "Your OTP must be 6 characters.",
  }),
});

export function VerifyEmailForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  });

  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isResendDisabled) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval!);
            setIsResendDisabled(false);
            return 60;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isResendDisabled]);

  function handleResendOTP() {
    setIsResendDisabled(true);
    form.setValue("otp", "");
    toast.success("OTP has been resent!");
  }

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  const isVerifyDisabled = form.watch("otp").length < 6;

  return (
    <Card className="w-lg">
      <CardHeader className="mb-3">
        <CardTitle className="text-3xl mb-2">Verify your email</CardTitle>
        <CardDescription>
          We have sent a verification email to your registered email address.
          Please check your inbox and follow the instructions to verify your
          email.
        </CardDescription>
      </CardHeader>

      <Separator />

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center gap-2.5">
                  <FormLabel>Verify email OTP</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription className="text-center">
                    Enter the OTP sent to your email address. If you didn&apos;t
                    receive it, please check your spam folder or request a new
                    OTP.
                  </FormDescription>
                </FormItem>
              )}
            />

            <div className="flex justify-center gap-4">
              <Button
                type="button"
                variant={"outline"}
                onClick={handleResendOTP}
                disabled={isResendDisabled}
              >
                {isResendDisabled ? `Resend OTP (${timer}s)` : "Resend OTP"}
              </Button>
              <Button
                type="submit"
                variant={"secondary"}
                size={"lg"}
                disabled={isVerifyDisabled}
              >
                Verify
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
