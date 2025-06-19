"use client";

import { redirect } from "next/navigation";

import { useUser } from "../hooks/use-user";
import { UserProvider } from "./UserProvider";

export function HostOnly({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return null; // Optionally, you can return a loading spinner or placeholder
  }

  if (!user) {
    return redirect("/sign-in");
  }

  if (user.role != "host") {
    return redirect("/host/sign-up");
  }

  return <UserProvider user={user}>{children}</UserProvider>;
}
