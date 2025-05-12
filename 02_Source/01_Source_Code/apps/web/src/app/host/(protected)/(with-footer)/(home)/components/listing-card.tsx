import Image from "next/image";

import { PropertyWithReviews } from "@/typings/models";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatPrice, makePluralNoun } from "@/lib/utils";

type ListingCardProps = {
  item: PropertyWithReviews;
};

export function ListingCard({ item }: ListingCardProps) {
  return (
    <article className="border shadow overflow-clip rounded-xl">
      <div className="relative aspect-[4/3]">
        <Image src={item.imageUrls[0]} alt={item.title} fill priority />
      </div>

      <section className="h-full p-4 ">
        <h3 className="font-medium">{item.title}</h3>
        <p className="text-sm text-muted-foreground">{item.address}</p>
        <div className="flex items-center justify-between mt-4">
          <div>
            <p className="text-sm font-medium">
              {formatPrice(item.pricePerNight)} night
            </p>
            <div className="flex items-center mt-1 text-sm text-muted-foreground">
              <span className="mr-1">★</span>
              <span>{item.reviews.rating}</span>
              <span className="mx-1">·</span>
              <span>
                {makePluralNoun("review", item.reviews.numberOfReviews)}
              </span>
            </div>
          </div>
          <Button variant="outline" size="sm" disabled>
            Edit
          </Button>
        </div>
      </section>
    </article>
  );
}

export function ListingCardFallback() {
  return (
    <div className="border shadow overflow-clip rounded-xl">
      <Skeleton className="aspect-[4/3] rounded-none" />
      <div className="p-4">
        <Skeleton className="w-1/2 h-5 mb-2" />
        <Skeleton className="w-1/3 h-4 mb-4" />
        <div className="flex items-center justify-between">
          <div className="grow">
            <Skeleton className="w-1/3 h-5 mb-1" />
            <Skeleton className="w-1/2 h-4" />
          </div>
          <Button variant="outline" size="sm" disabled>
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
}
