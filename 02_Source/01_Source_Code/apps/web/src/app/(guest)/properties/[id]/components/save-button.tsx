"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { HeartIcon } from "lucide-react";
import { useTransition } from "react";

import {
  addWishlist,
  checkIfWishlistExists,
  deleteWishlistByPropertyId,
} from "@/app/(user)/wishlists/data/crud";
import { Property } from "@/typings/models";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

type SaveButtonProps = {
  item: Property;
};

export function SaveButton({ item }: SaveButtonProps) {
  const isInWishlist = useLiveQuery(
    async () => await checkIfWishlistExists(item.id)
  );
  const [isPending, startTransition] = useTransition();

  const handleSave = () => {
    startTransition(async () => {
      await addWishlist({
        name: item.title,
        imageUrl: item.imageUrls[0],
        rating: item.rating,
        propertyId: item.id,
      });
    });
  };
  const handleUnsave = () => {
    startTransition(async () => {
      await deleteWishlistByPropertyId(item.id);
    });
  };

  const isLoading = isInWishlist == undefined;
  const clickAction = isInWishlist ? handleUnsave : handleSave;
  const clickText = isInWishlist ? "Remove" : "Save";
  const clickIcon = isInWishlist ? (
    <HeartIcon size={16} className="fill-current text-primary" />
  ) : (
    <HeartIcon size={16} />
  );
  const clickDisabled = isPending;

  if (isLoading) {
    return <Skeleton className="w-[78px] h-9 opacity-20" />;
  }

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
