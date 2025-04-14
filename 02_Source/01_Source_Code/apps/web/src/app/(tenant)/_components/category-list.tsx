import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { DisplayPriceAfterTaxes } from "./display-price-after-taxes";
import { FiltersDialog } from "./filter-dialog";

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
  // 20 more items
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
  return (
    <div className="width-container h-[4.875rem]">
      <div className="flex items-center h-full mx-auto overflow-x-clip gap-4">
        <Carousel
          className="grow overflow-hidden"
          opts={{
            align: "start",
            dragFree: true,
            slidesToScroll: 10,
            containScroll: "keepSnaps",
          }}
        >
          <CarouselContent className="my-4">
            {categories.map((artwork, index) => (
              <CarouselItem
                key={index}
                className="basis-[max-content] shrink-0 grow-0"
              >
                <figure key={artwork.name + index} className="shrink-0">
                  <div className="flex flex-col items-center">
                    <Image
                      src={artwork.imageUrl}
                      alt={`Photo by ${artwork.name}`}
                      className="aspect-1 size-[40px] object-cover rounded-md"
                      width={40}
                      height={40}
                    />
                  </div>
                  <figcaption className="mt-1 text-xs text-muted-foreground text-center">
                    {artwork.name}
                  </figcaption>
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 disabled:hidden" />
          <CarouselNext className="right-0 disabled:hidden  " />
        </Carousel>

        <div className="flex gap-4 shrink-0">
          <FiltersDialog />
          <DisplayPriceAfterTaxes />
        </div>
      </div>
    </div>
  );
}
