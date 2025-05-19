"use client";

import { format } from "date-fns";
import { Star, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Wishlist } from "@/typings/models";

import { Stack } from "@/components/layout/stack";
import { useEditState } from "@/hooks/use-edit-state";
import { deleteWishlist } from "../data/crud";

type WishlistCardProps = {
  item: Wishlist;
};

export function WishlistCard({ item }: WishlistCardProps) {
  const { isEditing } = useEditState();

  const handleRemoveFromRecentlyViewed = async () => {
    await deleteWishlist(item.id);
  };

  return (
    <article key={item.id} className="relative">
      <Link href={`/properties/${item.propertyId}`}>
        <Image
          src={item.imageUrl}
          alt={item.name}
          width={280}
          height={280}
          className="mb-2.5 rounded-2xl w-full aspect-square"
        />
        <Stack className="justify-between">
          <h3 className="font-semibold">{item.name}</h3>
          <span className="inline-flex items-center gap-1 opacity-70">
            <Star className="fill-current mt-0.5" size={12} />
            {item.rating}
          </span>
        </Stack>
        <p>{format(new Date(item.createdAt), "eeee, MMMM d")}</p>
      </Link>
      <Button
        className={cn(
          "rounded-full absolute top-3 right-3 bg-white shadow size-7 hidden",
          isEditing && "inline-flex"
        )}
        variant="ghost"
        size="icon"
        aria-label="Remove from recently viewed list"
        onClick={handleRemoveFromRecentlyViewed}
      >
        <X />
      </Button>
    </article>
  );
}
