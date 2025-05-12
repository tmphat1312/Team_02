"use client";

import { useReducer, useTransition } from "react";

import { useUser } from "@/features/auth/hooks/use-user";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { authClient } from "@/lib/auth-client";
import { env } from "@/env";
import { TextAlert } from "@/components/typography/text-alert";

export function VerifyEmailForm() {
  const [isSent, setIsSent] = useReducer(() => true, false);
  const [isPending, startTransition] = useTransition();
  const { user } = useUser();

  const handleSendVerification = () => {
    startTransition(async () => {
      setIsSent();
      await authClient.sendVerificationEmail({
        email: user!.email,
        callbackURL: env.NEXT_PUBLIC_APP_URL,
      });
    });
  };

  if (!user) {
    return null;
  }

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

            <Button
              variant="secondary"
              disabled={isSent || isPending}
              onClick={handleSendVerification}
              className="w-full"
            >
              Send verification link
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
}
