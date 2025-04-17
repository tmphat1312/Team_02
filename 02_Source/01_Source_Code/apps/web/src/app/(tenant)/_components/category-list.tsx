"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { FiltersDialog } from "./filter-dialog";
import { DisplayPriceAfterTaxes } from "./display-price-after-taxes";

type Category = {
  id: number;
  name: string;
  imageUrl: string;
};

const categories: Category[] = [
  {
    id: 1,
    name: "Cottage",
    imageUrl: "./placeholder.svg",
  },
  {
    id: 2,
    name: "Cabin",
    imageUrl: "./placeholder.svg",
  },
  {
    id: 3,
    name: "Treehouse",
    imageUrl: "./placeholder.svg",
  },
  {
    id: 4,
    name: "Mansion",
    imageUrl: "./placeholder.svg",
  },
  {
    id: 5,
    name: "Luxe",
    imageUrl: "./placeholder.svg",
  },
  {
    id: 6,
    name: "Amazing views",
    imageUrl: "./placeholder.svg",
  },
  {
    id: 7,
    name: "Beachfront",
    imageUrl: "./placeholder.svg",
  },
  {
    id: 8,
    name: "Countryside",
    imageUrl: "./placeholder.svg",
  },
  {
    id: 9,
    name: "Tiny homes",
    imageUrl: "./placeholder.svg",
  },

  {
    id: 10,
    name: "Amazing views",
    imageUrl: "./placeholder.svg",
  },
  {
    id: 11,
    name: "Beachfront",
    imageUrl: "./placeholder.svg",
  },
  {
    id: 12,
    name: "Countryside",
    imageUrl: "./placeholder.svg",
  },
  {
    id: 13,
    name: "Tiny homes",
    imageUrl: "./placeholder.svg",
  },
  {
    id: 14,
    name: "Amazing views",
    imageUrl: "./placeholder.svg",
  },
  {
    id: 15,
    name: "Amazing views",
    imageUrl: "./placeholder.svg",
  },
  {
    id: 16,
    name: "Beachfront",
    imageUrl: "./placeholder.svg",
  },
  {
    id: 17,
    name: "Countryside",
    imageUrl: "./placeholder.svg",
  },
  {
    id: 18,
    name: "Tiny homes",
    imageUrl: "./placeholder.svg",
  },
  {
    id: 19,
    name: "Amazing views",
    imageUrl: "./placeholder.svg",
  },
  {
    id: 20,
    name: "Amazing views",
    imageUrl: "./placeholder.svg",
  },
  {
    id: 21,
    name: "Beachfront",
    imageUrl: "./placeholder.svg",
  },
  {
    id: 22,
    name: "Countryside",
    imageUrl: "./placeholder.svg",
  },
  {
    id: 23,
    name: "Tiny homes",
    imageUrl: "./placeholder.svg",
  },
  {
    id: 24,
    name: "Amazing views",
    imageUrl: "./placeholder.svg",
  },
  {
    id: 25,
    name: "Amazing views",
    imageUrl: "./placeholder.svg",
  },
  {
    id: 26,
    name: "Beachfront",
    imageUrl: "./placeholder.svg",
  },
  {
    id: 27,
    name: "Countryside",
    imageUrl: "./placeholder.svg",
  },
  {
    id: 28,
    name: "Tiny homes",
    imageUrl: "./placeholder.svg",
  },
  {
    id: 29,
    name: "Amazing views",
    imageUrl: "./placeholder.svg",
  },
];

export function CategoryList() {
  const categoryListRef = useRef<HTMLDivElement>(null);
  const observerElRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!categoryListRef.current || !observerElRef.current) return;

    const categoryListEl = categoryListRef.current;
    const observerEl = observerElRef.current;

    const observer = new IntersectionObserver(([entry]) => {
      categoryListEl.classList.toggle("shadow", !entry.isIntersecting);
    });

    observer.observe(observerEl);
    return () => observer.unobserve(observerEl);
  }, []);

  return (
    <>
      <div ref={observerElRef} />
      <div ref={categoryListRef} className=" sticky top-[81px] z-50 bg-white">
        <div className="width-container h-[4.875rem]">
          <div className="flex items-center gap-6">
            <Carousel
              className="grow overflow-hidden"
              opts={{
                align: "start",
                dragFree: true,
                slidesToScroll: 10,
                containScroll: "keepSnaps",
              }}
            >
              <CarouselContent className="my-2.5">
                {categories.map((category, index) => (
                  <CarouselItem
                    key={index}
                    className="basis-[max-content] shrink-0 grow-0"
                  >
                    <CategoryItem item={category} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0 disabled:hidden" />
              <CarouselNext className="right-0 disabled:hidden  " />
            </Carousel>

            <div className="flex items-center gap-3 shrink-0">
              <FiltersDialog />
              <DisplayPriceAfterTaxes />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

type CategoryItemProps = {
  item: Category;
};

function CategoryItem({ item }: CategoryItemProps) {
  return (
    <figure className="text-center space-y-1">
      <Image
        src={item.imageUrl}
        alt={`Photo by ${item.name}`}
        className="aspect-1 size-[40px] object-cover rounded-md mx-auto"
        width={40}
        height={40}
      />
      <figcaption className="text-xs text-muted-foreground">
        {item.name}
      </figcaption>
    </figure>
  );
}
