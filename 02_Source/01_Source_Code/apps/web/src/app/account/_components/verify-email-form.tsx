"use client";

import { useUser } from "@/app/(auth)/_hooks/use-user";
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

export function VerifyEmailForm() {
  const { user } = useUser();

  return (
    <section className="flex items-center justify-between">
      <h4>Email Verification</h4>
      {user?.emailVerified ? (
        <p className="text-sm text-gray-500">Email verified</p>
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
                We have sent a verification email to {user?.email}. Please check
                your inbox and click the link to verify your email address.
              </DialogDescription>
            </DialogHeader>

            <DialogClose asChild>
              <Button variant="secondary">Close</Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
}
