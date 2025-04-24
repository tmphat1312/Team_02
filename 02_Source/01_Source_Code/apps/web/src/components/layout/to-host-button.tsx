"use client";

import Link from "next/link";

import { useUser } from "@/app/(auth)/_hooks/use-user";

import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

export function ToHostButton() {
  const { isLoading, isHost } = useUser();
  const linkText = isHost ? "Switch to hosting" : "Airbnb your home";

  if (isLoading) {
    return <Skeleton className="h-8 w-32 rounded-full" />;
  }

  return (
    <Link
      href="/host"
      className={cn(
        `hidden md:flex items-center px-4 py-2.5 rounded-full`,
        "text-sm hover:bg-accent font-medium"
      )}
    >
      {linkText}
    </Link>
  );
}
