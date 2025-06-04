import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { User } from "@/typings/models";

export async function getUser(): Promise<User> {
  const headersList = await headers();
  const { data } = await auth.getSession(undefined, {
    headers: headersList,
  });

  if (!data) {
    throw new Error("No session found");
  }

  return data.user;
}
