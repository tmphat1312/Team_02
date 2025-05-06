"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { httpClient } from "@/lib/http-client";

export function BecomeAHostForm({ userId }: { userId: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleBecomeHost = () => {
    startTransition(async () => {
      try {
        await httpClient.post(`/users/${userId}/host`);
        router.replace("/host");
      } catch (error) {
        console.error("Error becoming a host:", error);
        toast.error(
          "An error occurred while trying to become a host. Please try again."
        );
      }
    });
  };

  return (
    <Card className="w-lg">
      <CardHeader>
        <CardTitle className="mb-2 text-3xl">Become a Host</CardTitle>
        <CardDescription>
          Becoming a host enables you to list your property and manage bookings
          directly on our platform.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          type="submit"
          className="w-full"
          variant={"secondary"}
          size={"lg"}
          disabled={isPending}
          onClick={handleBecomeHost}
        >
          Become a host
        </Button>
      </CardContent>
    </Card>
  );
}
