"use client";

import { Star } from "lucide-react";
import Link from "next/link";

import { Property } from "@/typings/models";
import { Stack } from "@/components/layout/stack";
import { TextAlert } from "@/components/typography/text-alert";
import { Skeleton } from "@/components/ui/skeleton";
import { PropertyImageCarousel } from "@/features/listing/components/property-image-carousel";
import { formatPrice } from "@/lib/utils";

type RoomProps = {
  item: Property;
};

export function Room({ item }: RoomProps) {
  return (
    <div>
      <PropertyImageCarousel item={item} />
      <Link href={`/properties/${item.id}`} target="_blank">
        <article>
          <section className="flex justify-between gap-1">
            <h3 className="font-semibold">{item.address}</h3>
            <Stack className="gap-1">
              <Star className="fill-current size-3" />
              <span className="text-sm">{item.rating ?? "New"}</span>
            </Stack>
          </section>
          <TextAlert className="truncate">{item.title}</TextAlert>
          <div>
            <span className="font-semibold">
              {formatPrice(item.pricePerNight)}
            </span>
            <span> per night</span>
          </div>
        </article>
      </Link>
    </div>
  );
}

export function RoomFallback() {
  return (
    <div className="space-y-2 group">
      <Skeleton className="w-full rounded-xl aspect-square" />
      <div>
        <Skeleton className="w-2/3 h-6 mb-1" />
        <Skeleton className="w-1/3 h-4 mb-1" />
        <Skeleton className="w-1/2 h-5" />
      </div>
    </div>
  );
}
