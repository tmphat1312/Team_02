"use client";

import { useTransition } from "react";

import { Google } from "@/components/icons/google";
import { Button } from "@/components/ui/button";
import { env } from "@/env";
import { authClient } from "@/lib/auth-client";

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
    <div className="p-7 pt-2">
      <SocialSigninButton onClick={googleSignIn} disabled={isPending}>
        <Google className="ms-4 size-5" />
        <span className="font-medium text-sm">Continue with Google</span>
        <span aria-hidden />
      </SocialSigninButton>
    </div>
  );
}

function SocialSigninButton(props: React.ComponentProps<"button">) {
  return (
    <Button
      variant="outline"
      className="w-full py-6 text-base flex items-center justify-between border-gray-400/60"
      {...props}
    />
  );
}
