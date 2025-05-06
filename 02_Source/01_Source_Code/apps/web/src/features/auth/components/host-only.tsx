import { redirect } from "next/navigation";

import { getServerSession } from "../data/get-server-session";

export async function HostOnly({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();

  if (!session) {
    return redirect("/sign-in");
  }

  if (session.user.role != "host") {
    return redirect("/host/sign-up");
  }

  return children;
}
