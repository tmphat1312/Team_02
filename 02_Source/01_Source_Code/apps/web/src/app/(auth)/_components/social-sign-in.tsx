"use client";

import { useTransition } from "react";

import { Google } from "@/components/icons/google";
import { Button } from "@/components/ui/button";

import { authClient } from "@/lib/auth-client";
import { env } from "@/env";

export function SocialSignIn() {
  const [isPending, startTransition] = useTransition();

  const googleSignIn = () => {
    startTransition(async () => {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: env.NEXT_PUBLIC_APP_URL,
      });
    });
  };

  return (
    <div className="space-y-3 p-7 pt-0">
      <SocialSigninButton onClick={googleSignIn} disabled={isPending}>
        <Google className="ms-4 size-5" />
        <span className="font-medium text-sm">Continue with Google</span>
        <span />
      </SocialSigninButton>
    </div>
  );
}

function SocialSigninButton(props: React.ComponentProps<"button">) {
  return (
    <Button
      variant="outline"
      className="w-full py-6 text-base flex items-center justify-between border-gray-800"
      {...props}
    />
  );
}
