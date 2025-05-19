"use client";

import { User } from "@/typings/models";

import { UserContext } from "../contexts/UserContext";

export function UserProvider({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User;
}) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
