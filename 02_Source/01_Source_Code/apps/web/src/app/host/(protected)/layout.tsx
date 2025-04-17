import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { Footer } from "@/components/layout/footer";
import { HostHeader } from "@/components/layout/host-header";
import { authClient } from "@/lib/auth-client";

export default async function ProtectedHostLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const { data } = await authClient.getSession(undefined, {
    headers: headersList,
  });

  if (!data || data.user.role !== "host") {
    return redirect("/host/sign-up");
  }

  return (
    <>
      <HostHeader />
      <main>{children}</main>
      <Footer />
    </>
  );
}
