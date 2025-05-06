"use client";

import { Star } from "lucide-react";
import Link from "next/link";

import { Property } from "@/app/typings/models";
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
          <section className="flex justify-between">
            <h3 className="font-semibold">{item.title}</h3>
            <div className="flex items-center gap-1">
              <Star className="fill-current size-3" />
              <span className="text-sm">{item.rating ?? "New"}</span>
            </div>
          </section>
          <p className="text-sm text-muted-foreground">{item.location}</p>
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
    <div className="group space-y-2">
      <Skeleton className="w-full aspect-square rounded-xl" />
      <div>
        <Skeleton className="w-2/3 h-6 mb-1" />
        <Skeleton className="w-1/3 h-4 mb-1" />
        <Skeleton className="w-1/2 h-5" />
      </div>
    </div>
  );
}
