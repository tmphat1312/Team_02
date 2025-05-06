"use client";

import Image from "next/image";
import { use } from "react";

import { Amenity } from "@/app/typings/models";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Stack } from "@/components/layout/stack";

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
    const toggle = newSet.has(id)
      ? (id: number) => newSet.delete(id)
      : (id: number) => newSet.add(id);
    toggle(id);
    onValueChange(Array.from(newSet));
  };

  return (
    <Stack className="flex-wrap gap-x-2 gap-y-3">
      {amenities.map((amenity) => (
        <Button
          key={amenity.id}
          variant="outline"
          className={cn("rounded-full py-2.5 px-4 font-normal", {
            "bg-primary/10 border-primary/50": value.includes(amenity.id),
          })}
          onClick={() => toggleAmenity(amenity.id)}
        >
          <Image
            alt={`Photo by ${amenity.name}`}
            src={amenity.imageUrl}
            width={20}
            height={20}
            className="size-5"
          />
          {amenity.name}
        </Button>
      ))}
    </Stack>
  );
}
