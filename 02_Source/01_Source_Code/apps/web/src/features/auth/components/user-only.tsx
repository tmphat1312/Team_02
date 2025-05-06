import { redirect } from "next/navigation";

import { getServerSession } from "../data/get-server-session";

export async function UserOnly({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();

  if (!session || !session.user) {
    return redirect("/sign-in");
  }

  return children;
}
