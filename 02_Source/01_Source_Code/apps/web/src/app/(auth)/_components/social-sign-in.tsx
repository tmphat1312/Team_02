import { Smartphone } from "lucide-react";

import { Apple } from "@/components/icons/apple";
import { Facebook } from "@/components/icons/facebook";
import { Google } from "@/components/icons/google";
import { Button } from "@/components/ui/button";

export function SocialSignIn() {
  return (
    <div className="space-y-3 p-7 pt-0">
      <SocialSigninButton>
        <Google className="ms-4 size-5" />
        <span className="font-medium text-sm">Continue with Google</span>
        <span />
      </SocialSigninButton>

      <SocialSigninButton>
        <Apple className="ms-4 size-5" />
        <span className="font-medium text-sm">Continue with Apple</span>
        <span />
      </SocialSigninButton>

      <SocialSigninButton>
        <Smartphone className="ms-4 size-5" />
        <span className="font-medium text-sm">Continue with Phone</span>
        <span />
      </SocialSigninButton>

      <SocialSigninButton>
        <Facebook className="ms-4 size-5" />
        <span className="font-medium text-sm">Continue with Facebook</span>
        <span />
      </SocialSigninButton>
    </div>
  );
}

function SocialSigninButton({ children }: { children: React.ReactNode }) {
  return (
    <Button
      variant="outline"
      className="w-full py-6 text-base flex items-center justify-between border-gray-800 cursor-pointer"
      type="button"
    >
      {children}
    </Button>
  );
}
