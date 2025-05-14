import Image from "next/image";

import { Stack } from "@/components/layout/stack";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatPrice, makePluralNoun } from "@/lib/utils";
import { PropertyWithReviews } from "@/typings/models";

type Props = {
  item: PropertyWithReviews;
};

export function ListingCard({ item }: Props) {
  return (
    <article className="border shadow overflow-clip rounded-xl">
      <div className="relative aspect-[4/3]">
        <Image
          src={item.imageUrls[0]}
          alt={item.title}
          sizes="20vw"
          fill
          priority
        />
      </div>

      <section className="h-full p-4 ">
        <h3 className="font-medium">{item.title}</h3>
        <p className="text-sm text-muted-foreground">{item.address}</p>
        <Stack className="justify-between mt-4">
          <div>
            <p className="text-sm font-medium">
              {formatPrice(item.pricePerNight)} night
            </p>
            <Stack className="mt-1 text-sm text-muted-foreground">
              <span className="mr-1">★</span>
              <span>{item.reviews.rating}</span>
              <span className="mx-1">·</span>
              <span>
                {makePluralNoun("review", item.reviews.numberOfReviews)}
              </span>
            </Stack>
          </div>
          <Button variant="outline" size="sm" disabled>
            Edit
          </Button>
        </Stack>
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
