"use client";

import { Page } from "@/components/layout/page";
import { Stack } from "@/components/layout/stack";

import { useUserContext } from "@/features/auth/contexts/UserContext";
import { BecomeAHost } from "./components/become-a-host";
import { UpdatePersonalInformation } from "./components/update-personal-information";
import { VerifyEmail } from "./components/verify-email";

export default function HostSignupPage() {
  const user = useUserContext();

  const isEmailVerified = user.emailVerified || false;
  const didUpdatePersonalInfo = user.phoneNumber && user.address;

  const children = !isEmailVerified ? (
    <VerifyEmail />
  ) : !didUpdatePersonalInfo ? (
    <UpdatePersonalInformation />
  ) : (
    <BecomeAHost userId={user.id} />
  );

  return (
    <Page>
      <Stack className="justify-center my-8">{children}</Stack>
    </Page>
  );
}
