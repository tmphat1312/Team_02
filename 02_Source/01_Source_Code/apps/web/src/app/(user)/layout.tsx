import { UserOnly } from "@/features/auth/components/user-only";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <UserOnly>{children}</UserOnly>;
}
