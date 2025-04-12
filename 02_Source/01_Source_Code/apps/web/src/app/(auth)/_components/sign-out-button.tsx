"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export function SignOutButton({ className }: { className?: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const signOut = () => {
    startTransition(async () => {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.replace("/");
            toast.success("Logged out successfully");
          },
        },
      });
    });
  };

  return (
    <Button
      variant="ghost"
      onClick={signOut}
      disabled={isPending}
      className={cn("font-normal text-start justify-start", className)}
    >
      {isPending ? "Logging out..." : "Log out"}
    </Button>
  );
}
