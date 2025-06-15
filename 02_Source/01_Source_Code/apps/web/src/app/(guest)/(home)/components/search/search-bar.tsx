"use client";

import { Search } from "lucide-react";
import React from "react";

import { House } from "@/components/icons/house";
import { Grid } from "@/components/layout/grid";
import { Stack } from "@/components/layout/stack";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import { Guests } from "./guests";
import { Location } from "./location";
import { SearchContext } from "./search-context";

export function SearchBar() {
  const [suggestedOpen, setSuggestedOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [guestsOpen, setGuestsOpen] = React.useState(false);
  const [guests, setGuests] = React.useState(0);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [lat, setLat] = React.useState<number | null>(null);
  const [lng, setLng] = React.useState<number | null>(null);

  return (
    <div
      className={cn(
        "fixed left-1/2 -translate-x-1/2 top-4 z-50 border rounded-full shadow-md px-2 flex items-center bg-background",
        searchOpen && "bg-muted"
      )}
    >
      <Popover open={searchOpen} onOpenChange={setSearchOpen}>
        <PopoverTrigger asChild>
          <button className="cursor-pointer inline-flex items-center h-11 text-sm">
            <Stack className="divide-x-2 font-medium">
              <Stack className="px-2.5 gap-2">
                <House className="size-7" />
                Anywhere
              </Stack>
              <div className="px-2.5 self-stretch grid place-content-center">
                Add guests
              </div>
              <div
                className={cn(
                  "rounded-full size-7 ms-2.5 inline-grid place-content-center",
                  "bg-primary text-primary-foreground",
                  searchOpen && "bg-primary/50"
                )}
              >
                <Search size={14} className="stroke-3" />
              </div>
            </Stack>
          </button>
        </PopoverTrigger>
        <PopoverContent
          sideOffset={10}
          className="w-xl rounded-full p-0 bg-background motion-preset-slide-down"
        >
          <Grid className="divide-x-2 grid-cols-2 bg-muted/30">
            <SearchContext.Provider
              value={{
                searchValue,
                setSearchValue,
                suggestedOpen,
                setSuggestedOpen,
                guestsOpen,
                setGuestsOpen,
                guests,
                setGuests,
                searchOpen,
                setSearchOpen,
                lat,
                setLat,
                lng,
                setLng,
              }}
            >
              <Location />
              <Guests />
            </SearchContext.Provider>
          </Grid>
        </PopoverContent>
      </Popover>
    </div>
  );
}
