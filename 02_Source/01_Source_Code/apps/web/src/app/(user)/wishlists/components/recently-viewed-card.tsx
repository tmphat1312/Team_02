"use client";

import { format } from "date-fns";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Stack } from "@/components/layout/stack";
import { Button } from "@/components/ui/button";
import { useEditState } from "@/hooks/use-edit-state";
import { cn } from "@/lib/utils";
import { RecentlyViewed } from "@/typings/models";

import { deleteRecentlyViewed } from "../data/crud";

type Props = {
  item: RecentlyViewed;
};

export function RecentlyViewedCard({ item }: Props) {
  const { isEditing } = useEditState();

  const handleRemoveFromRecentlyViewed = () => {
    deleteRecentlyViewed(item.id);
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
        <Stack className="justify-between">
          <h3 className="font-semibold">{item.name}</h3>
        </Stack>
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
