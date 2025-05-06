import { redirect } from "next/navigation";

import { getServerSession } from "../data/get-server-session";

export async function TenantOnly({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();

  if (!session) {
    return redirect("/sign-in");
  }

  if (session.user.role != "tenant") {
    return redirect("/sign-in");
  }

  return children;
}
