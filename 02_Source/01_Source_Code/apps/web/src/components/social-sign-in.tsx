import { Smartphone } from "lucide-react";

import { Apple } from "./icons/apple";
import { Facebook } from "./icons/facebook";
import { Google } from "./icons/google";
import { Button } from "./ui/button";

export function SocialSignIn() {
  return (
    <div className="space-y-3 p-7 pt-0">
      <Button
        variant="outline"
        className="w-full py-6 text-base flex items-center justify-between border-gray-800 cursor-pointer"
        type="button"
      >
        <Google className="ms-4 size-5" />
        <span className="font-medium text-sm">Continue with Google</span>
        <span />
      </Button>

      <Button
        variant="outline"
        className="w-full py-6 text-base flex items-center justify-between border-gray-800 cursor-pointer"
        type="button"
      >
        <Apple className="ms-4 size-5" />
        <span className="font-medium text-sm">Continue with Apple</span>
        <span />
      </Button>

      <Button
        variant="outline"
        className="w-full py-6 text-base flex items-center justify-between border-gray-800 cursor-pointer"
        type="button"
      >
        <Smartphone className="ms-4 size-5" />
        <span className="font-medium text-sm">Continue with Phone</span>
        <span />
      </Button>

      <Button
        variant="outline"
        className="w-full py-6 text-base flex items-center justify-between border-gray-800 cursor-pointer"
        type="button"
      >
        <Facebook className="ms-4 size-5" />

        <span className="font-medium text-sm">Continue with Facebook</span>
        <span />
      </Button>
    </div>
  );
}
