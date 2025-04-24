"use client";

import { HeartIcon } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { delay } from "@/lib/utils";

export function SaveButton({ propertyId }: { propertyId: number }) {
  const isLoading = false; // TODO: check if property is loading
  const [isInWishlist, setIsInWishlist] = useState(false);

  const [isPending, startTransition] = useTransition();

  const handleSave = () => {
    startTransition(async () => {
      await delay(2_000);
      setIsInWishlist(true);
      console.log(propertyId);
      toast.success("Property saved!");
    });
  };
  const handleUnsave = () => {
    startTransition(async () => {
      await delay(2_000);
      setIsInWishlist(false);
      console.log(propertyId);
      toast.success("Property removed from wishlist!");
    });
  };

  if (isLoading) {
    return <Skeleton className="w-[78px] h-9" />;
  }

  const clickAction = isInWishlist ? handleUnsave : handleSave;
  const clickText = isInWishlist
    ? isPending
      ? "Removing..."
      : "Remove"
    : isPending
    ? "Saving..."
    : "Save";
  const clickIcon = isInWishlist ? (
    <HeartIcon size={16} className="fill-current text-airbnb" />
  ) : (
    <HeartIcon size={16} />
  );
  const clickDisabled = isPending;

  return (
    <Button
      variant="ghost"
      className="underline"
      onClick={clickAction}
      disabled={clickDisabled}
    >
      {clickIcon}
      {clickText}
    </Button>
  );
}
