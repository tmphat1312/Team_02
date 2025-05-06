"use client";

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

type PropertyImageCarousel = {
  item: Property;
};

export function PropertyImageCarousel({ item }: PropertyImageCarousel) {
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
    <div className="aspect-square overflow-hidden rounded-xl mb-2 relative group shadow">
      <Carousel setApi={setApi}>
        <CarouselContent>
          {item.imageUrls.slice(0, 5).map((url, i) => (
            <CarouselItem key={url + i} className="w-full h-full">
              <Link href={`/properties/${item.id}`} target="_blank">
                <Image
                  src={url}
                  alt={item.title}
                  className="size-full object-cover"
                  height={300}
                  width={300}
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
      </Carousel>
    </div>
  );
}
