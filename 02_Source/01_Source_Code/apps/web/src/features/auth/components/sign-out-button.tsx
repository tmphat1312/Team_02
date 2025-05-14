"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { cn } from "@/lib/utils";

export function SignOutButton({ className }: { className?: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const signOut = () => {
    startTransition(async () => {
      await auth.signOut({
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
