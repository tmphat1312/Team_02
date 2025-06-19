"use client";

import { redirect } from "next/navigation";

import { useUser } from "../hooks/use-user";

export function GuestOnly({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return null; // Optionally, you can return a loading spinner or placeholder
  }

  if (user) {
    return redirect("/");
  }

  return children;
}
