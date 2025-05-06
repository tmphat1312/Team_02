import { Page } from "@/components/layout/page";
import { getServerSession } from "@/features/auth/data/get-server-session";

import { BecomeAHostForm } from "./_components/become-a-host-form";
import { UpdatePersonalInformation } from "./_components/update-personal-information";
import { VerifyEmailForm } from "./_components/verify-email-form";
import { Stack } from "@/components/layout/stack";

export default async function HostSignupPage() {
  const session = await getServerSession();
  const user = session!.user;
  const isEmailVerified = user.emailVerified || false;
  const didUpdatePersonalInfo = user.phoneNumber && user.address;

  const children = !isEmailVerified ? (
    <VerifyEmailForm />
  ) : !didUpdatePersonalInfo ? (
    <UpdatePersonalInformation />
  ) : (
    <BecomeAHostForm userId={user.id} />
  );

  return (
    <Page>
      <Stack className="justify-center my-8">{children}</Stack>
    </Page>
  );
}
