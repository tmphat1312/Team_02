"use client";

import { useTransition } from "react";
import { Smartphone } from "lucide-react";

import { Apple } from "@/components/icons/apple";
import { Facebook } from "@/components/icons/facebook";
import { Google } from "@/components/icons/google";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export function SocialSignIn() {
  const [isPending, startTransition] = useTransition();

  const googleSignIn = () => {
    startTransition(async () => {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "http://localhost:3000",
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

      <SocialSigninButton disabled>
        <Apple className="ms-4 size-5" />
        <span className="font-medium text-sm">Continue with Apple</span>
        <span />
      </SocialSigninButton>

      <SocialSigninButton disabled>
        <Smartphone className="ms-4 size-5" />
        <span className="font-medium text-sm">Continue with Phone</span>
        <span />
      </SocialSigninButton>

      <SocialSigninButton disabled>
        <Facebook className="ms-4 size-5" />
        <span className="font-medium text-sm">Continue with Facebook</span>
        <span />
      </SocialSigninButton>
    </div>
  );
}

function SocialSigninButton({
  children,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <Button
      variant="outline"
      className="w-full py-6 text-base flex items-center justify-between border-gray-800 cursor-pointer"
      type="button"
      {...props}
    >
      {children}
    </Button>
  );
}
