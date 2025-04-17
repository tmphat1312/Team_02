import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function HostLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const { data } = await authClient.getSession(undefined, {
    headers: headersList,
  });

  if (!data) {
    return redirect("/sign-in");
  }

  return children;
}
