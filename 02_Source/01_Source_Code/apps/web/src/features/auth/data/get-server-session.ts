import { headers } from "next/headers";

import { auth } from "@/lib/auth";

export async function getServerSession() {
  const headersList = await headers();
  const { data } = await auth.getSession(undefined, {
    headers: headersList,
  });

  return data;
}
