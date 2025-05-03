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
import { Separator } from "@/components/ui/separator";
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
        <CardTitle className="text-3xl mb-2">Become a Host</CardTitle>
        <CardDescription>
          Becoming a host enables you to list your property and manage bookings
          directly on our platform.
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent>
        <section>
          <h2 className="text-xl font-medium mb-3 text-center">
            Click the button below to become a host
          </h2>
          <Button
            type="submit"
            className="w-full "
            variant={"secondary"}
            size={"lg"}
            disabled={isPending}
            onClick={handleBecomeHost}
          >
            Become a host
          </Button>
        </section>
      </CardContent>
    </Card>
  );
}
