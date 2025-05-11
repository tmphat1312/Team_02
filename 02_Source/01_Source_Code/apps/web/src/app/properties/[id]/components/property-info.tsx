import { Star } from "lucide-react";
import Link from "next/link";

import { Amenity, Category, Property, User } from "@/app/typings/models";
import { Stack } from "@/components/layout/stack";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { calculateRelativeTime, makePluralNoun } from "@/lib/utils";
import { PageSubHeading } from "@/components/typography/page-sub-heading";
import { PropertyAmenities } from "./property-amenities";

type PropertyInfoProps = React.ComponentProps<"div"> & {
  item: Property;
  rating: {
    numberOfReviews: number;
    averageRating: number;
  };
  host: User;
  categories: Category[];
  amenities: Amenity[];
};

export function PropertyInfo({
  item,
  host,
  rating,
  categories,
  amenities,
  ...props
}: PropertyInfoProps) {
  const category = categories.at(0)?.name;
  return (
    <div {...props}>
      <section className="pb-6 border-b">
        <PageSubHeading className="mb-0">
          <span>{category || "Category"}</span>
          <span> in </span>
          <span>{item.address}</span>
        </PageSubHeading>
        <p className="mb-3 text-muted-foreground">
          <span>{makePluralNoun("guest", item.numberOfGuests)} · </span>
          <span>{makePluralNoun("bedroom", item.numberOfBedrooms)} · </span>
          <span>{makePluralNoun("bed", item.numberOfBeds)} · </span>
          <span>{makePluralNoun("bath", item.numberOfBathrooms)}</span>
        </p>
        {rating.numberOfReviews > 0 ? (
          <p className="flex items-center gap-2 font-medium text-lg">
            <span className="inline-flex items-center gap-1.5">
              <Star className="fill-current" size={16} />
              {rating.averageRating.toFixed(1)}
            </span>
            <span>·</span>
            <Link href="#reviews" className="underline">
              {rating.numberOfReviews} reviews
            </Link>
          </p>
        ) : (
          <p className="inline-flex gap-1.5 items-center">
            <Star className="fill-current" size={16} />
            No reviews (yet)
          </p>
        )}
      </section>

      <Stack className="gap-4 py-6 border-b">
        <Avatar className="size-10">
          <AvatarImage src={host.image ?? undefined} alt={host.name} />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <section>
          <h3 className="font-medium">Hosted by {host.name}</h3>
          <p>{calculateRelativeTime(new Date(host.createdAt))} of hosting</p>
        </section>
      </Stack>

      <div
        className="py-6 border-b max-w-none prose"
        dangerouslySetInnerHTML={{ __html: item.description }}
      />

      <PropertyAmenities amenities={amenities} />
    </div>
  );
}
