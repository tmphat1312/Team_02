import { redirect } from "next/navigation";

import { getServerSession } from "../data/get-server-session";
import { UserProvider } from "./UserProvider";

export async function HostOnly({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();

  if (!session) {
    return redirect("/sign-in");
  }

  if (session.user.role != "host") {
    return redirect("/host/sign-up");
  }

  return <UserProvider user={session.user}>{children}</UserProvider>;
}
