"use client";

import { Suspense, useRef, useState } from "react";

import { Amenity } from "@/app/typings/models";
import { NumberInput } from "@/components/number-input";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  PRICE_MAX,
  PRICE_MIN,
  PRICE_STEP,
} from "@/features/listing/config/settings";
import { useFilterValues } from "@/features/listing/hooks/use-filter-values";

import { AmenityInput } from "./amenity-input";
import { PriceInput } from "./price-input";

type FilterDialogContentProps = {
  amenitiesPromise: Promise<Amenity[]>;
};

export function FilterDialogContent({
  amenitiesPromise,
}: FilterDialogContentProps) {
  const [
    {
      priceMin: initialPriceMin,
      priceMax: initialPriceMax,
      noBedsMin: initialNoBeds,
      noBedroomsMin: initialNoBedrooms,
      noBathroomsMin: initialNoBathrooms,
      amenityIds: initialAmenities,
    },
    setFilterValues,
  ] = useFilterValues();
  const [priceMax, setPriceMax] = useState(initialPriceMax || PRICE_MAX);
  const [priceMin, setPriceMin] = useState(initialPriceMin || PRICE_MIN);
  const [noBeds, setNoBeds] = useState(initialNoBeds || 0);
  const [noBedrooms, setNoBedrooms] = useState(initialNoBedrooms || 0);
  const [noBathrooms, setNoBathrooms] = useState(initialNoBathrooms || 0);
  const [amenityIds, setAmenityIds] = useState<number[]>(
    initialAmenities || []
  );

  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const handlePriceMinChange = (value: number) => {
    if (value > PRICE_MAX) {
      setPriceMax(PRICE_MAX);
    }
    setPriceMin(value);
    handlePriceValueChange([value, priceMax]);
  };
  const handlePriceMaxChange = (value: number) => {
    if (value < PRICE_MIN) {
      setPriceMin(PRICE_MIN);
    }
    setPriceMax(value);
    handlePriceValueChange([priceMin, value]);
  };
  const handlePriceValueChange = (value: number[]) => {
    const [min, max] = value;
    setPriceMin(min);
    setPriceMax(max);
  };

  const handleNoBedroomsChange = (value: number) => {
    setNoBedrooms(value);
  };
  const handleNoBathroomsChange = (value: number) => {
    setNoBathrooms(value);
  };
  const handleNoBedsChange = (value: number) => {
    setNoBeds(value);
  };

  const handleAmenitiesChange = (value: number[]) => {
    setAmenityIds(value);
  };

  const handleApplyFilters = () => {
    setFilterValues({
      priceMin: priceMin == PRICE_MIN ? null : priceMin,
      priceMax: priceMax == PRICE_MAX ? null : priceMax,
      amenityIds: amenityIds.length === 0 ? null : amenityIds,
      noBathroomsMin: noBathrooms == 0 ? null : noBathrooms,
      noBedroomsMin: noBedrooms == 0 ? null : noBedrooms,
      noBedsMin: noBeds == 0 ? null : noBeds,
    });

    const closeButtonEl = closeButtonRef.current;
    closeButtonEl?.click();
  };
  const handleClearFilters = () => {
    setPriceMin(PRICE_MIN);
    setPriceMax(PRICE_MAX);
    setNoBeds(0);
    setNoBedrooms(0);
    setNoBathrooms(0);
    setAmenityIds([]);
    setFilterValues(null);
  };

  const isDirty =
    priceMin !== PRICE_MIN ||
    priceMax !== PRICE_MAX ||
    noBeds !== 0 ||
    noBedrooms !== 0 ||
    noBathrooms !== 0 ||
    amenityIds.length > 0;

  return (
    <>
      <div className="border-b py-7 px-6 max-h-[32rem] overflow-y-auto">
        <section>
          <h3 className="text-lg font-medium">Price range</h3>
          <p className="text-sm mb-6">Nightly prices before fees and taxes</p>
          <PriceInput
            min={PRICE_MIN}
            max={PRICE_MAX}
            step={PRICE_STEP}
            value={[priceMin, priceMax]}
            onPriceMinChange={handlePriceMinChange}
            onPriceMaxChange={handlePriceMaxChange}
            onValueChange={handlePriceValueChange}
          />
        </section>
        <Separator className="my-7" />
        <section>
          <h3 className="text-lg font-medium mb-2">Rooms and Beds</h3>
          <div className="space-y-4">
            <NumberInput
              label="Bedrooms"
              value={noBedrooms}
              onValueChange={handleNoBedroomsChange}
              greaterInput
            />
            <NumberInput
              label="Beds"
              value={noBeds}
              onValueChange={handleNoBedsChange}
              greaterInput
            />
            <NumberInput
              label="Bathrooms"
              value={noBathrooms}
              onValueChange={handleNoBathroomsChange}
              greaterInput
            />
          </div>
        </section>
        <Separator className="my-7" />
        <section>
          <h3 className="text-lg font-medium mb-2">Amenities</h3>
          <Suspense fallback={null}>
            <AmenityInput
              value={amenityIds}
              amenitiesPromise={amenitiesPromise}
              onValueChange={handleAmenitiesChange}
            />
          </Suspense>
        </section>
      </div>

      <DialogFooter className="flex items-center py-4 px-6 h-20">
        <Button
          variant="ghost"
          className="font-semibold me-auto text-base h-10 -ml-2.5"
          onClick={handleClearFilters}
        >
          Clear all
        </Button>
        <Button
          className="h-12 text-base px-6 py-3.5"
          variant="secondary"
          onClick={handleApplyFilters}
          disabled={!isDirty}
        >
          Show matched places
        </Button>

        <DialogClose ref={closeButtonRef} />
      </DialogFooter>
    </>
  );
}
