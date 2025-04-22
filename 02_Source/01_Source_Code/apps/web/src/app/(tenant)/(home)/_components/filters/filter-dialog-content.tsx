"use client";

import { Suspense, useState } from "react";

import { Amenity } from "@/app/typings/models";

import { NumberInput } from "@/components/number-input";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

import { AmenityInput } from "./amenity-input";
import { PriceInput } from "./price-input";

import { useFilterValues } from "../../_hooks/use-filter-values";

const PRICE_MAX = 20_000_000;
const PRICE_MIN = 100_000;
const PRICE_STEP = 10_000;

type FilterDialogContentProps = {
  amenitiesPromise: Promise<Amenity[]>;
};

export function FilterDialogContent({
  amenitiesPromise,
}: FilterDialogContentProps) {
  const [priceMax, setPriceMax] = useState(PRICE_MAX);
  const [priceMin, setPriceMin] = useState(PRICE_MIN);
  const [noBeds, setNoBeds] = useState(0);
  const [noBedrooms, setNoBedrooms] = useState(0);
  const [noBathrooms, setNoBathrooms] = useState(0);
  const [amenities, setAmenities] = useState<number[]>([]);

  const [, setFilterValues] = useFilterValues();

  const handlePriceMinChange = (value: number) => {
    if (value > priceMax) {
      setPriceMax(value);
    }
    setPriceMin(value);
  };
  const handlePriceMaxChange = (value: number) => {
    if (value < priceMin) {
      setPriceMin(value);
    }
    setPriceMax(value);
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
    setAmenities(value);
  };

  const handleApplyFilters = () => {
    setFilterValues({
      priceMin,
      priceMax,
      amenities,
      noBathrooms,
      noBedrooms,
      noBeds,
    });
  };
  const handleClearFilters = () => {
    setFilterValues(null);
  };

  return (
    <>
      <div className="border-b border-gray-200 py-7 px-6 max-h-[32rem] overflow-y-auto">
        <section>
          <h4 className="text-lg font-medium">Price range</h4>
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
        <Separator className="border-gray-200/50 my-7" />
        <section>
          <h3 className="text-lg font-medium mb-2">Rooms and Beds</h3>
          <NumberInput
            label="Bedrooms"
            onValueChange={handleNoBedroomsChange}
          />
          <NumberInput label="Beds" onValueChange={handleNoBedsChange} />
          <NumberInput
            label="Bathrooms"
            onValueChange={handleNoBathroomsChange}
          />
        </section>
        <Separator className="border-gray-200/50 my-7" />
        <section>
          <h3 className="text-lg font-medium mb-2">Amenities</h3>
          <Suspense fallback={null}>
            <AmenityInput
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
          className="h-12 text-base text-white bg-black/80 hover:bg-black/90 px-6 py-3.5"
          onClick={handleApplyFilters}
        >
          Show matched places
        </Button>
      </DialogFooter>
    </>
  );
}
