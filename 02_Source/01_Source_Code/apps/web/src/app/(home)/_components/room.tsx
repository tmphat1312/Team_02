"use client";

import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Property } from "@/app/typings/models";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { formatPrice } from "@/lib/utils";

type RoomProps = {
  item: Property;
};

export function Room({ item: room }: RoomProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <Carousel setApi={setApi}>
      <div className="aspect-square overflow-hidden rounded-xl mb-2 relative group">
        <CarouselContent>
          {room.imageUrls.slice(0, 5).map((url, i) => (
            <CarouselItem key={url + i} className="w-full h-full">
              <Link href={`/properties/${room.id}`} target="_blank">
                <Image
                  src={url}
                  alt={room.title}
                  className="size-full object-cover"
                  width={300}
                  height={300}
                />
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-accent flex gap-1 backdrop-blur-xs p-1.5 rounded">
          {Array.from({ length: count }).map((_, i) => (
            <span
              key={i}
              className={`inline-block size-[6px] rounded-full shadow ${
                i === current - 1 ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>
        <div className="absolute top-1/2 left-2.5 -translate-y-1/2 size-8">
          <CarouselPrevious className="sm:hidden group-hover:flex inset-0 translate-0 disabled:hidden" />
        </div>
        <div className="absolute top-1/2 right-2.5 -translate-y-1/2 size-8">
          <CarouselNext className="sm:hidden group-hover:flex inset-0 translate-0 disabled:hidden" />
        </div>
      </div>

      <Link href={`/properties/${room.id}`} target="_blank">
        <article>
          <section className="flex justify-between">
            <h3 className="font-semibold">{room.title}</h3>
            <div className="flex items-center gap-1">
              <Star className="fill-current size-4" />
              <span className="text-sm">{room.rating ?? "New"}</span>
            </div>
          </section>
          <p className="text-sm text-muted-foreground">{room.location}</p>
          <div>
            <span className="font-semibold">
              {formatPrice(room.pricePerNight)}
            </span>
            <span> per night</span>
          </div>
        </article>
      </Link>
    </Carousel>
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
