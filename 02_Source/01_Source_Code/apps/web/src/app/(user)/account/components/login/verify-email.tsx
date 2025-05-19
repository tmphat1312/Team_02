"use client";

import { useReducer, useTransition } from "react";

import { TextAlert } from "@/components/typography/text-alert";
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
import { env } from "@/env";
import { auth } from "@/lib/auth";
import { User } from "@/typings/models";

type Props = {
  user: User;
};

export function VerifyEmail({ user }: Props) {
  const [isSent, setIsSent] = useReducer(() => true, false);
  const [isPending, startTransition] = useTransition();

  const handleSendVerification = () => {
    startTransition(async () => {
      setIsSent();
      await auth.sendVerificationEmail({
        email: user.email,
        callbackURL: env.NEXT_PUBLIC_APP_URL,
      });
    });
  };

  return (
    <section className="flex justify-between items-center">
      <h3>Email Verification</h3>
      {user.emailVerified ? (
        <TextAlert>Email verified</TextAlert>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="lg" className="underline">
              Verify Email
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Verify your email</DialogTitle>
              <DialogDescription>
                {isSent
                  ? `We have sent a verification email to ${user?.email}. Please check your inbox and click the link to verify your email address.`
                  : "Click the button below to verify your email address"}
              </DialogDescription>
            </DialogHeader>

            {isSent ? (
              <DialogClose asChild>
                <Button
                  variant="secondary"
                  disabled={isPending}
                  onClick={() => setIsSent()}
                  className="w-full"
                >
                  Close
                </Button>
              </DialogClose>
            ) : (
              <Button
                variant="secondary"
                disabled={isSent || isPending}
                onClick={handleSendVerification}
                className="w-full"
              >
                Send verification link
              </Button>
            )}
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
}
