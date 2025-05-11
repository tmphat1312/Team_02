import Image from "next/image";

import { Property } from "@/app/typings/models";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type PhotoGalleryProps = {
  item: Property;
};

export function PhotoGallery({ item }: PhotoGalleryProps) {
  const [spotlightImageUrl, ...featuredImageUrls] = item.imageUrls.slice(0, 5);
  return (
    <div className="@container">
      <div className="grid-cols-4 grid-rows-[200px_200px] gap-2 rounded-2xl overflow-clip hidden @2xl:grid">
        <Image
          src={spotlightImageUrl}
          alt={`Spotlight image of ${item.title}`}
          width={560}
          height={400}
          className="size-full col-span-2 row-span-2 bg-accent"
          priority
        />
        {featuredImageUrls.map((url, i) => (
          <Image
            key={url + i}
            src={url}
            alt={`Featured image of ${item.title}`}
            width={300}
            height={300}
            className="size-full bg-accent"
            priority
          />
        ))}
      </div>
      <Carousel
        className="overflow-hidden @2xl:hidden rounded-2xl"
        opts={{
          align: "start",
          dragFree: true,
          skipSnaps: true,
          containScroll: "keepSnaps",
        }}
      >
        <CarouselContent>
          {item.imageUrls.map((url, index) => (
            <CarouselItem key={index} className="max-h-100 shrink-0 grow-0">
              <Image
                src={url}
                alt={`Image of ${item.title}`}
                width={560}
                height={400}
                className="object-cover size-full bg-accent"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2 " />
      </Carousel>
    </div>
  );
}
