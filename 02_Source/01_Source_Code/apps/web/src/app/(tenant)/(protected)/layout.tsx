import { redirect } from "next/navigation";

import { getServerSession } from "@/app/(auth)/_data/get-server-session";

export default async function TenantProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  if (!session) {
    return redirect("/sign-in");
  }

  return children;
}
