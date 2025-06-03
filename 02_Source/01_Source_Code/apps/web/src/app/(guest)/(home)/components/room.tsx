"use client";

import { Star } from "lucide-react";
import Link from "next/link";

import { Stack } from "@/components/layout/stack";
import { TextAlert } from "@/components/typography/text-alert";
import { Skeleton } from "@/components/ui/skeleton";
import { PropertyImageCarousel } from "@/features/listing/components/property-image-carousel";
import { cn, formatPrice } from "@/lib/utils";
import { Property } from "@/typings/models";

import { useIsMapOpen } from "../hooks/use-is-map-open";

type RoomProps = {
  item: Property;
};

export function Room({ item }: RoomProps) {
  const { isMapOpen } = useIsMapOpen();

  return (
    <div className={cn(isMapOpen ? "text-sm" : "text-base")}>
      <PropertyImageCarousel item={item} />
      <Link href={`/properties/${item.id}`} target="_blank">
        <article>
          <section className="flex justify-between gap-1 items-start">
            <h3 className="font-semibold">{item.address}</h3>
            <Stack className="gap-1 items-center">
              <Star
                className={cn(
                  "fill-current",
                  isMapOpen ? "size-2.5" : "size-2"
                )}
              />
              <span className={cn(isMapOpen ? "text-xs" : "text-sm")}>
                {item.rating?.toFixed(1) ?? "New"}
              </span>
            </Stack>
          </section>
          <TextAlert className="truncate">{item.title}</TextAlert>
          <div className="text-sm">
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
  const { isMapOpen } = useIsMapOpen();
  return (
    <div className="space-y-2 group">
      <Skeleton className="w-full rounded-xl aspect-square" />
      <div>
        <Skeleton className={cn("w-2/3 mb-1", isMapOpen ? "h-5" : "h-6")} />
        <Skeleton className={cn("w-1/3 mb-1", isMapOpen ? "h-3" : "h-4")} />
        <Skeleton className={cn("w-1/2 ", isMapOpen ? "h-4" : "h-5")} />
      </div>
    </div>
  );
}
