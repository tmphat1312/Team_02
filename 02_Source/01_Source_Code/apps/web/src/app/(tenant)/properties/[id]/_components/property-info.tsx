import { Star } from "lucide-react";
import Link from "next/link";

import { Amenity, Property } from "@/app/typings/models";

import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { calculateRelativeTime } from "@/lib/utils";
import Image from "next/image";

type PropertyInfoProps = React.ComponentProps<"div"> & {
  item: Property;
  rating: {
    numberOfReviews: number;
    averageRating: number;
  };
  host: {
    name: string;
    imageUrl: string;
    hostDate: string;
  };
  amenities: Amenity[];
};

export function PropertyInfo({
  item,
  rating,
  host,
  amenities,
  ...props
}: PropertyInfoProps) {
  return (
    <div {...props}>
      <section className="mb-6">
        <h2 className="text-xl font-semibold">
          <span>Category</span>
          <span> in </span>
          <span>{item.location}</span>
        </h2>
        <p className="text-muted-foreground mb-3">
          <span>{item.numberOfGuests} guests · </span>
          <span>{item.numberOfBedrooms} bedrooms · </span>
          <span>{item.numberOfBeds} beds · </span>
          <span>{item.numberOfBathrooms} baths</span>
        </p>
        <p className="flex items-center gap-2 text-lg font-medium">
          <span className="inline-flex items-center gap-1.5">
            <Star className="fill-current" size={18} />
            {rating.averageRating.toFixed(1)}
          </span>
          <span>·</span>
          <Link href="#reviews" className="underline">
            {rating.numberOfReviews} reviews
          </Link>
        </p>
      </section>

      <Separator className="my-6" />

      <section className="flex gap-4 items-center">
        <Avatar className="size-10">
          <AvatarImage src={host.imageUrl} alt={host.name} />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium">Hosted by {host.name}</h3>
          <p>{calculateRelativeTime(new Date(host.hostDate))} of hosting</p>
        </div>
      </section>

      <Separator className="my-6" />

      <div
        className="prose max-w-none mb-6"
        dangerouslySetInnerHTML={{ __html: item.description }}
      />

      <Separator className="my-6" />

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-6">What this place offers</h2>
        <ul className="grid grid-cols-2 gap-4">
          {amenities.map((amenity) => (
            <li key={amenity.id} className="flex items-center gap-3">
              <Image
                src={amenity.imageUrl}
                alt={amenity.name}
                width={28}
                height={28}
                className="size-7"
              />
              <span>{amenity.name}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
