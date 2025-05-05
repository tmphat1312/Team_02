import { redirect } from "next/navigation";

import { Footer } from "@/components/layout/footer";
import { HostHeader } from "@/components/layout/host-header";

import { getServerSession } from "@/app/(auth)/_data/get-server-session";

export default async function ProtectedHostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  if (!session) {
    return redirect("/sign-in");
  }

  if (session.user.role != "host") {
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
