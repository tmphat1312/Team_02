import { getServerSession } from "@/app/(auth)/_data/get-server-session";
import { VerifyEmailForm } from "./_components/verify-email-form";
import { BecomeAHostForm } from "./_components/become-a-host-form";

export default async function HostSignupPage() {
  const session = await getServerSession();
  const isEmailVerified = session!.user.emailVerified || false;

  if (!isEmailVerified) {
    return <VerifyEmailForm />;
  }

  return <BecomeAHostForm />;
}
