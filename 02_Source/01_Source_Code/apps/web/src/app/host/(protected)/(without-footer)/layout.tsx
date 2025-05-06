import { redirect } from "next/navigation";

import { getServerSession } from "@/features/auth/data/get-server-session";
import { HostHeader } from "@/components/layout/host-header";

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
    <div className="min-h-dvh grid grid-rows-[auto_1fr]">
      <HostHeader />
      <main className="width-container">{children}</main>
    </div>
  );
}
