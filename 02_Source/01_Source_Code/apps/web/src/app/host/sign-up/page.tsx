import { getServerSession } from "@/app/(auth)/_data/get-server-session";

import { BecomeAHostForm } from "./_components/become-a-host-form";
import { UpdatePersonalInformation } from "./_components/update-personal-information";
import { VerifyEmailForm } from "./_components/verify-email-form";

export default async function HostSignupPage() {
  const session = await getServerSession();
  const user = session!.user;
  const isEmailVerified = user.emailVerified || false;
  const didUpdatePersonalInfo = user.phoneNumber && user.address;

  if (!isEmailVerified) {
    return <VerifyEmailForm />;
  }

  if (!didUpdatePersonalInfo) {
    return <UpdatePersonalInformation />;
  }

  return <BecomeAHostForm userId={user.id} />;
}
