import { UserOnly } from "@/features/auth/components/user-only";

export default async function TenantProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <UserOnly>{children}</UserOnly>;
}
