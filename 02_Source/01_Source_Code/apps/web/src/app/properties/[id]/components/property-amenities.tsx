import Image from "next/image";

import { Amenity } from "@/typings/models";
import { ShowMore } from "@/components/show-more";
import { PageSubHeading } from "@/components/typography/page-sub-heading";
import { cn, makePluralNoun } from "@/lib/utils";

type PropertyAmenitiesProps = {
  amenities: Amenity[];
};

const CutOffLength = 8;

export function PropertyAmenities({ amenities }: PropertyAmenitiesProps) {
  return (
    <section className="mb-6 py-6">
      <PageSubHeading>What this place offers</PageSubHeading>
      <AmenityList>
        {amenities.slice(0, CutOffLength).map((amenity) => (
          <AmenityItem key={amenity.id} amenity={amenity} />
        ))}
      </AmenityList>

      {amenities.length > CutOffLength && (
        <ShowMore
          title="What this place offers"
          buttonLabel={`Show more ${makePluralNoun(
            "amenity",
            amenities.length - CutOffLength
          )}`}
        >
          <AmenityList className="gap-6">
            {amenities.map((amenity) => (
              <AmenityItem key={amenity.id} amenity={amenity} />
            ))}
          </AmenityList>
        </ShowMore>
      )}
    </section>
  );
}

function AmenityList(props: React.ComponentProps<"ul">) {
  return (
    <ul {...props} className={cn(`grid grid-cols-2 gap-4`, props.className)} />
  );
}

function AmenityItem({ amenity }: { amenity: Amenity }) {
  return (
    <li className="flex items-center gap-3">
      <Image
        src={amenity.imageUrl}
        alt={amenity.name}
        width={28}
        height={28}
        className="size-7"
      />
      <span>{amenity.name}</span>
    </li>
  );
}
