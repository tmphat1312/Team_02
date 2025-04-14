"use client";

import { X } from "lucide-react";

import { Filter } from "@/components/icons/filter";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

import { AmenityInput } from "./amenity-input";
import { NumberInput } from "./number-input";
import { PriceChart } from "./price-chart";
import { PriceInput } from "./price-input";

export function FiltersDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="h-12 font-normal">
          <Filter /> Filters
        </Button>
      </DialogTrigger>

      <DialogContent
        className="sm:max-w-[35.5rem] rounded-4xl p-0 gap-0"
        hideCloseButton
      >
        <DialogHeader className="flex items-center justify-between border-b border-gray-200 py-4 px-6">
          <DialogTitle className="text-lg font-semibold">Filters</DialogTitle>
        </DialogHeader>

        <div className="border-b border-gray-200 py-7 px-6 max-h-[32rem] overflow-y-auto">
          <section>
            <h4 className="text-lg font-medium">Price range</h4>
            <p className="text-sm mb-6">Nightly prices before fees and taxes</p>
            <div className="space-y-8">
              <PriceChart />
              <PriceInput />
            </div>
          </section>
          <Separator className="border-gray-200/50 my-7" />
          <section>
            <h3 className="text-lg font-medium mb-2">Rooms and Beds</h3>
            <NumberInput label="Bedrooms" />
            <NumberInput label="Beds" />
            <NumberInput label="Bathrooms" />
          </section>
          <Separator className="border-gray-200/50 my-7" />
          <section>
            <h3 className="text-lg font-medium mb-2">Amenities</h3>
            <AmenityInput />
          </section>
        </div>

        <DialogFooter className="flex items-center py-4 px-6 h-20">
          <Button
            variant="ghost"
            className="font-semibold me-auto text-base h-10 -ml-2.5"
          >
            Clear all
          </Button>
          <Button className="h-12 text-base text-white bg-black/80 hover:bg-black/90 px-6 py-3.5">
            Show 413 places
          </Button>
        </DialogFooter>

        <DialogClose asChild>
          <Button
            variant="ghost"
            className="absolute top-4 right-4 rounded-full p-0"
          >
            <X size={32} />
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
