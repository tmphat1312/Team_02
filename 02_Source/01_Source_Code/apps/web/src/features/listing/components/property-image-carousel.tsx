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
    <div className="relative mb-2 shadow group rounded-xl overflow-clip">
      <Carousel setApi={setApi}>
        <CarouselContent>
          {item.imageUrls.slice(0, 5).map((url, i) => (
            <CarouselItem key={url + i} className="size-full">
              <Link href={`/properties/${item.id}`} target="_blank">
                <Image
                  src={url}
                  alt={item.title}
                  className="object-cover bg-accent aspect-square"
                  width={500}
                  height={500}
                  priority
                />
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="bottom-4 left-1/2 absolute flex gap-1 backdrop-blur-xs p-1.5 rounded text-accent -translate-x-1/2">
          {Array.from({ length: count }).map((_, i) => (
            <span
              key={i}
              className={`inline-block size-[6px] rounded-full shadow ${
                i === current - 1 ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>
        <div className="top-1/2 left-2.5 absolute size-8 -translate-y-1/2">
          <CarouselPrevious className="inset-0 sm:hidden disabled:hidden group-hover:flex translate-0" />
        </div>
        <div className="top-1/2 right-2.5 absolute size-8 -translate-y-1/2">
          <CarouselNext className="inset-0 sm:hidden disabled:hidden group-hover:flex translate-0" />
        </div>
      </Carousel>
    </div>
  );
}
