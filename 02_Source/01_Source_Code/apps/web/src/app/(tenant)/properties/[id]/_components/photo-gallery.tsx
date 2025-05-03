import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

type PhotoGalleryProps = {
  imageUrls: string[];
  propertyName: string;
};

export function PhotoGallery({ imageUrls, propertyName }: PhotoGalleryProps) {
  const [spotlightImageUrl, ...featuredImageUrls] = imageUrls.slice(0, 5);
  return (
    <div className="@container">
      <div className="grid-cols-4 grid-rows-[200px_200px] gap-2 rounded-2xl overflow-clip hidden @2xl:grid">
        <Image
          src={spotlightImageUrl}
          alt={`Spotlight image of ${propertyName}`}
          width={560}
          height={400}
          className="object-cover w-full h-full col-span-2 row-span-2 bg-accent"
        />
        {featuredImageUrls.map((url, i) => (
          <Image
            key={url + i}
            src={url}
            alt={`Featured image of ${propertyName}`}
            width={300}
            height={300}
            className="object-cover w-full h-full bg-accent"
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
          {imageUrls.map((url, index) => (
            <CarouselItem key={index} className="max-h-100 shrink-0 grow-0">
              <Image
                src={url}
                alt={`Image of ${propertyName}`}
                width={560}
                height={400}
                className="object-cover w-full h-full bg-accent"
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
