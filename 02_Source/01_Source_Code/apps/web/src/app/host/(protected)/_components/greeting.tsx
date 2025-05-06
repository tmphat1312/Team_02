"use client";

import { useUser } from "@/features/auth/hooks/use-user";
import { Skeleton } from "@/components/ui/skeleton";

export function Greeting(props: React.ComponentProps<"section">) {
  const { user } = useUser();

  return (
    <section {...props}>
      <h1 className="text-3xl mb-2 flex items-center gap-2">
        Welcome back,
        {user ? (
          <span className="font-semibold"> {user.name}</span>
        ) : (
          <Skeleton className="h-9 w-48 inline-block" />
        )}
      </h1>
      <p>Let&apos;s see what is happening today!</p>
    </section>
  );
}
