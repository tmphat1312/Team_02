import { HostOnly } from "@/features/auth/components/host-only";

export default async function HostSignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <HostOnly>{children}</HostOnly>;
}
