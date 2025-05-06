import { headers } from "next/headers";

import { authClient } from "@/lib/auth-client";

export async function getServerSession() {
  const headersList = await headers();
  const { data } = await authClient.getSession(undefined, {
    headers: headersList,
  });

  return data;
}
