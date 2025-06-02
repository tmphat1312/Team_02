"use client";

import { Stack } from "@/components/layout/stack";
import { Separator } from "@/components/ui/separator";
import { User } from "@/typings/models";

import { DeleteAccount } from "./delete-account";
import { UpdateEmail } from "./update-email";
import { UpdatePassword } from "./update-password";
import { VerifyEmail } from "./verify-email";
import { useUserContext } from "@/features/auth/contexts/UserContext";

export function UpdateLogin() {
  const user = useUserContext();
  return (
    <Stack orientation="vertical" className="gap-6">
      <section>
        <h3 className="mb-4 text-2xl">Login</h3>
        <Stack orientation="vertical" className="gap-4">
          <UpdateEmail user={user} />
          <Separator />
          <VerifyEmail user={user} />
          <Separator />
          <UpdatePassword />
        </Stack>
      </section>
      <section>
        <h3 className="mb-4 text-2xl">Account</h3>
        <DeleteAccount />
      </section>
    </Stack>
  );
}
