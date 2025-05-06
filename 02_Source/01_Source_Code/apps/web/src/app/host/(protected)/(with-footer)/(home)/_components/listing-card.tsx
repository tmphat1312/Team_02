import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { PropertyWithReviews } from "../_models/property-with-reviews";
import { formatPrice, makePluralNoun } from "@/lib/utils";

type ListingCardProps = {
  item: PropertyWithReviews;
};

export function ListingCard({ item }: ListingCardProps) {
  return (
    <article className="overflow-clip rounded-xl border shadow">
      <div className="relative aspect-[4/3]">
        <Image src={item.imageUrls[0]} alt={item.title} fill />
      </div>

      <section className="p-4">
        <h3 className="font-medium">{item.title}</h3>
        <p className="text-sm text-muted-foreground">{item.location}</p>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">
              {formatPrice(item.pricePerNight)} night
            </p>
            <div className="mt-1 flex items-center text-sm text-muted-foreground">
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
    <div className="overflow-clip rounded-xl border shadow">
      <Skeleton className="aspect-[4/3] rounded-none" />
      <div className="p-4">
        <Skeleton className="h-5 w-1/2 mb-2" />
        <Skeleton className="h-4 w-1/3 mb-4" />
        <div className="flex items-center justify-between">
          <div className="grow">
            <Skeleton className="h-5 w-1/3 mb-1" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <Button variant="outline" size="sm" disabled>
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
}
