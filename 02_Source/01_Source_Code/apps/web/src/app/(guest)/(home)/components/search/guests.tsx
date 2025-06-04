"use client";

import { Search } from "lucide-react";
import React from "react";

import { Stack } from "@/components/layout/stack";
import { NumberInput } from "@/components/number-input";
import { Button } from "@/components/ui/button";
import { makePluralNoun } from "@/lib/utils";

import { useSearchContext } from "./search-context";
import {
  parseAsFloat,
  parseAsInteger,
  parseAsString,
  useQueryState,
} from "nuqs";

export function Guests() {
  const [, setNoGuestsMin] = useQueryState("noGuestsMin", parseAsInteger);
  const [, setSearch] = useQueryState("search", parseAsString.withDefault(""));
  const [, setLat] = useQueryState("lat", parseAsFloat);
  const [, setLng] = useQueryState("lng", parseAsFloat);
  const {
    setSuggestedOpen,
    guestsOpen,
    setGuestsOpen,
    guests,
    setGuests,
    setSearchOpen,
    lat,
    lng,
    searchValue,
  } = useSearchContext();

  const isDisabled = (lat === null || lng === null) && guests === 0;

  return (
    <div className="relative">
      <Stack>
        <button
          onClick={() => {
            setGuestsOpen(true);
            setSuggestedOpen(false);
          }}
          className="cursor-pointer focus:bg-background focus-within:bg-background w-full p-3"
        >
          <Stack orientation="vertical" className="items-start ">
            <span className="text-sm font-medium">Who</span>
            <span className="text-muted-foreground">
              {guests > 0 ? makePluralNoun("guest", guests) : "Add guests"}
            </span>
          </Stack>
        </button>
        {guestsOpen && (
          <div className="motion-preset-expand motion-duration-400 absolute top-[120%] left-0 bg-background rounded-3xl border shadow-md w-full">
            <section className="px-4 py-6">
              <NumberInput
                label="Guests"
                value={guests}
                onValueChange={(value) => {
                  setGuests(value);
                }}
                greaterInput
              />
            </section>
          </div>
        )}
        <Button
          size={"icon"}
          className="bg-primary rounded-full text-white inline-grid place-content-center me-2 size-12"
          onClick={() => {
            setSearchOpen(false);
            setGuestsOpen(false);
            setSuggestedOpen(false);
            setNoGuestsMin(guests == 0 ? null : guests);
            setLat(lat);
            setLng(lng);
            setSearch(searchValue);
          }}
          disabled={isDisabled}
        >
          <Search className="stroke-3" size={28} />
        </Button>
      </Stack>
    </div>
  );
}
