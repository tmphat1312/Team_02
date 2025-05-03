"use client";

import { format } from "date-fns";
import { Star, X } from "lucide-react";
import Image from "next/image";

import { RecentlyViewed } from "@/app/typings/models";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { deleteRecentlyViewed } from "../_data/crud";
import { useIsEditingQueryState } from "../_hooks/use-is-editing-query-state";
import Link from "next/link";

type RecentlyViewedCardProps = {
  item: RecentlyViewed;
};

export function RecentlyViewedCard({ item }: RecentlyViewedCardProps) {
  const { isEditing } = useIsEditingQueryState();

  const handleRemoveFromRecentlyViewed = async () => {
    await deleteRecentlyViewed(item.id);
  };

  return (
    <article key={item.id} className="relative">
      <Link href={`/properties/${item.propertyId}`}>
        <Image
          src={item.imageUrl}
          alt={item.name}
          width={280}
          height={280}
          className="w-full aspect-square rounded-2xl mb-2.5"
        />
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">{item.name}</h3>
          <span className="inline-flex items-center gap-1 opacity-70">
            <Star className="fill-current mt-0.5" size={12} />
            {item.rating}
          </span>
        </div>
        <p>{format(new Date(item.viewedAt), "eeee, MMMM d")}</p>
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
