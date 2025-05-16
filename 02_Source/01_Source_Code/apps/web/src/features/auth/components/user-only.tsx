import { redirect } from "next/navigation";

import { getServerSession } from "../data/get-server-session";
import { UserProvider } from "./UserProvider";

export async function UserOnly({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();

  if (!session || !session.user) {
    return redirect("/sign-in");
  }

  return <UserProvider user={session.user}>{children}</UserProvider>;
}
