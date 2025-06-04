"use client";

import Link from "next/link";

import { useUser } from "@/features/auth/hooks/use-user";

import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

export function ToTenantButton() {
  const { isLoading } = useUser();

  if (isLoading) {
    return <Skeleton className="h-8 w-32 rounded-full" />;
  }

  return (
    <Link
      href="/"
      className={cn(
        "hidden md:flex items-center px-4 py-2.5 rounded-full",
        "text-sm hover:bg-accent font-medium"
      )}
    >
      Back to explore
    </Link>
  );
}
