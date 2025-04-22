"use client";

import { use, useState } from "react";
import Image from "next/image";

import { Amenity } from "@/app/typings/models";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AmenityInputProps = {
  amenitiesPromise: Promise<Amenity[]>;
  onValueChange?: (value: number[]) => void;
};

export function AmenityInput({
  amenitiesPromise,
  onValueChange = () => {},
}: AmenityInputProps) {
  const amenities = use(amenitiesPromise);
  const [selectedAmenities, setSelectedAmenities] = useState<Set<number>>(
    new Set()
  );

  const toggleAmenity = (id: number) => {
    setSelectedAmenities((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      onValueChange(Array.from(newSet));
      return newSet;
    });
  };

  return (
    <div className="flex flex-wrap gap-x-2 gap-y-3">
      {amenities.map((amenity) => (
        <Button
          key={amenity.id}
          variant="outline"
          className={cn("rounded-full py-2.5 px-4  font-normal", {
            "bg-airbnb/10 text-black": selectedAmenities.has(amenity.id),
          })}
          onClick={() => toggleAmenity(amenity.id)}
        >
          <Image
            className="size-5"
            src={amenity.imageUrl}
            width={20}
            height={20}
            alt={`Photo by ${amenity.name}`}
          />
          {amenity.name}
        </Button>
      ))}
    </div>
  );
}
