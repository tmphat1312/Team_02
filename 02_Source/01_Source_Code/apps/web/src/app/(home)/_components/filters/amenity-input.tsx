"use client";

import Image from "next/image";
import { use } from "react";

import { Amenity } from "@/app/typings/models";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AmenityInputProps = {
  amenitiesPromise: Promise<Amenity[]>;
  value: number[];
  onValueChange: (value: number[]) => void;
};

export function AmenityInput({
  amenitiesPromise,
  value,
  onValueChange,
}: AmenityInputProps) {
  const amenities = use(amenitiesPromise);

  const toggleAmenity = (id: number) => {
    const newSet = new Set(value);

    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }

    onValueChange(Array.from(newSet));
  };

  return (
    <div className="flex flex-wrap gap-x-2 gap-y-3">
      {amenities.map((amenity) => (
        <Button
          key={amenity.id}
          variant="outline"
          className={cn("rounded-full py-2.5 px-4  font-normal", {
            "bg-airbnb/10 text-black": value.includes(amenity.id),
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
