"use client";

import { ShareIcon } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export function ShareButton({ propertyId }: { propertyId: number }) {
  const [isPending, startTransition] = useTransition();

  const handleShare = () => {
    toast.success("Property link copied to clipboard, ready!");
    startTransition(async () => {
      await navigator.clipboard.writeText(
        `${window.location.origin}/properties/${propertyId}`
      );
    });
  };

  return (
    <Button
      variant="ghost"
      className="underline"
      onClick={handleShare}
      disabled={isPending}
    >
      <ShareIcon size={16} />
      Share
    </Button>
  );
}
