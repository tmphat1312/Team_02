"use client";

import Image from "next/image";
import { use } from "react";

import { Category } from "@/app/typings/models";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { useFilterValues } from "../../_hooks/use-filter-values";

import { cn } from "@/lib/utils";

type CategoryListProps = {
  categoriesPromise: Promise<Category[]>;
};

export function CategoryList({ categoriesPromise }: CategoryListProps) {
  const categories = use(categoriesPromise);
  return (
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
  );
}

type CategoryItemProps = {
  item: Category;
};

function CategoryItem({ item }: CategoryItemProps) {
  const [{ categoryId }, setValues] = useFilterValues();

  const handleClick = () => {
    setValues({ categoryId: item.id });
  };

  return (
    <figure
      className={cn(
        "text-center space-y-1 text-muted-foreground p-2",
        "border-b-3 border-transparent hover:border-current",
        "cursor-pointer font-medium",
        { "border-current text-black": categoryId === item.id }
      )}
      onClick={handleClick}
    >
      <Image
        src={item.imageUrl}
        alt={`Photo by ${item.name}`}
        className="aspect-1 size-6 object-cover mx-auto mb-1"
        width={24}
        height={24}
      />
      <figcaption className="text-xs">{item.name}</figcaption>
    </figure>
  );
}

export function CategoryListFallback() {
  return (
    <Carousel
      className="grow overflow-hidden"
      opts={{
        align: "start",
        dragFree: true,
        slidesToScroll: 10,
        containScroll: "keepSnaps",
      }}
    >
      <CarouselContent className="my-2.5 gap-2">
        {Array.from({ length: 20 }).map((_, index) => (
          <div key={index} className="">
            <div className="size-6 animate-pulse bg-muted mx-auto flex" />
            <div className="h-4 w-16 animate-pulse rounded bg-muted mt-1" />
          </div>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-0 disabled:hidden" />
      <CarouselNext className="right-0 disabled:hidden  " />
    </Carousel>
  );
}
