"use client";

import { MapPin, MousePointer2, X } from "lucide-react";
import { useDeferredValue } from "react";

import { Loader } from "@/components/icons/loader";
import { Stack } from "@/components/layout/stack";
import { TextAlert } from "@/components/typography/text-alert";
import { getGeoTextSuggestions } from "@/features/map/data/get-geo-text-suggestions";
import { retrieveCoordinates } from "@/features/map/data/retrieve-coordinates";
import { useQuery } from "@tanstack/react-query";

import { useSearchContext } from "./search-context";

const SuggestedLocation = [
  {
    id: 1,
    name: "Da Nang, Vietnam",
    description: "Must-visit destination",
    icon: <MapPin className="text-red-500" />,
    color: "bg-red-50",
  },
  {
    id: 2,
    name: "Hanoi, Vietnam",
    description: "Must-visit destination",
    icon: <MapPin className="text-green-500" />,
    color: "bg-green-50",
  },
  {
    id: 3,
    name: "Ho Chi Minh City, Vietnam",
    description: "Must-visit destination",
    icon: <MapPin className="text-yellow-500" />,
    color: "bg-yellow-50",
  },
  {
    id: 4,
    name: "Nha Trang, Vietnam",
    description: "Must-visit destination",
    icon: <MapPin className="text-purple-500" />,
    color: "bg-purple-50",
  },
  {
    id: 5,
    name: "Phu Quoc, Vietnam",
    description: "Must-visit destination",
    icon: <MapPin className="text-orange-500" />,
    color: "bg-orange-50",
  },
  {
    id: 6,
    name: "Da Lat, Vietnam",
    description: "Must-visit destination",
    icon: <MapPin className="text-pink-500" />,
    color: "bg-pink-50",
  },
];

export function Location() {
  const {
    searchValue,
    setSearchValue,
    suggestedOpen,
    setSuggestedOpen,
    setGuestsOpen,
    setLat,
    setLng,
  } = useSearchContext();

  return (
    <div className="focus-within:bg-background rounded-l-full relative">
      <label
        className="p-3 ps-8 block text-sm font-medium cursor-pointer relative"
        htmlFor="location-search"
      >
        Where
        <input
          id="location-search"
          placeholder="Search destinations"
          className="w-full focus:outline-none"
          autoComplete="off"
          onFocus={() => {
            setSuggestedOpen(true);
            setGuestsOpen(false);
          }}
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
            setSuggestedOpen(true);
          }}
        />
        {searchValue.length > 0 && (
          <button
            className="absolute top-1/2 right-3 cursor-pointer hover:scale-110 transition-transform"
            onClick={() => {
              setSearchValue("");
              setLng(null);
              setLat(null);
            }}
          >
            <X size={16} />
          </button>
        )}
      </label>
      {suggestedOpen && (
        <div className="motion-preset-expand motion-duration-400 absolute top-[120%] left-0 w-sm bg-background rounded-4xl border shadow-md">
          <section className="px-4 py-6">
            <h3 className="text-muted-foreground text-sm mb-1 px-2">
              {searchValue.length == 0
                ? " Suggested destinations"
                : "Search results"}
            </h3>
            {searchValue.length == 0 ? <Suggested /> : <Searched />}
          </section>
        </div>
      )}
    </div>
  );
}

function Suggested() {
  const { setSearchValue, setSuggestedOpen, setLng, setLat } =
    useSearchContext();
  return (
    <ul className="min-h-60 max-h-100 overflow-y-auto scroll-pt-4">
      <li className="hover:bg-muted rounded-lg">
        <button
          className="cursor-pointer w-full p-2"
          onClick={() => {
            setSuggestedOpen(false);
            setSearchValue("Nearby");
            setLng(106.49361);
            setLat(10.589728);
          }}
        >
          <Stack className="gap-4">
            <div className="size-14 rounded-lg grid place-content-center bg-blue-50">
              <MousePointer2 className="text-blue-500 scale-x-[-1]" />
            </div>
            <Stack
              orientation="vertical"
              className="items-start text-sm gap-0.5"
            >
              <span className="font-semibold">Nearby</span>
              <span className="text-muted-foreground">
                Find what&apos;s around you
              </span>
            </Stack>
          </Stack>
        </button>
      </li>
      {SuggestedLocation.map((location) => (
        <li key={location.id} className="hover:bg-muted rounded-lg">
          <button
            className="cursor-pointer w-full p-2"
            onClick={() => {
              setSuggestedOpen(false);
              setSearchValue(location.name);
            }}
          >
            <Stack className="gap-4">
              <div
                className={`size-14 rounded-lg grid place-content-center ${location.color}`}
              >
                {location.icon}
              </div>
              <Stack
                orientation="vertical"
                className="items-start text-sm gap-0.5"
              >
                <span className="font-semibold">{location.name}</span>
                <span className="text-muted-foreground">
                  {location.description}
                </span>
              </Stack>
            </Stack>
          </button>
        </li>
      ))}
    </ul>
  );
}

function Searched() {
  const { searchValue, setSearchValue, setSuggestedOpen, setLng, setLat } =
    useSearchContext();
  const deferred = useDeferredValue(searchValue);

  const { isLoading, data: suggestions } = useQuery({
    queryKey: [deferred, "searched"],
    queryFn: () => getGeoTextSuggestions(deferred),
  });

  return (
    <ul className="min-h-60 max-h-100 overflow-y-auto scroll-pt-4">
      {isLoading || !suggestions ? (
        <Loader className="mx-auto" />
      ) : (
        <>
          {suggestions.length == 0 ? (
            <TextAlert className="p-2 text-xs">
              Could not find any suggestions
            </TextAlert>
          ) : (
            <>
              {suggestions.map((s) => (
                <li className="hover:bg-muted rounded-lg" key={s.mapbox_id}>
                  <button
                    className="cursor-pointer w-full p-2"
                    onClick={async () => {
                      setSearchValue(s.address);
                      setSuggestedOpen(false);
                      const { coordinates } = await retrieveCoordinates(
                        s.mapbox_id
                      );
                      setLng(coordinates[0]);
                      setLat(coordinates[1]);
                    }}
                  >
                    <Stack className="gap-4">
                      <div
                        className={`size-14 rounded-lg grid place-content-center bg-stone-100 shrink-0`}
                      >
                        <MapPin className="text-stone-500" />
                      </div>
                      <Stack
                        orientation="vertical"
                        className="text-sm gap-0.5 items-start"
                      >
                        <span className="font-semibold text-sm text-start">
                          {s.name}
                        </span>
                        <span className="text-xs text-start">
                          {s.full_address}
                        </span>
                      </Stack>
                    </Stack>
                  </button>
                </li>
              ))}
            </>
          )}
        </>
      )}
    </ul>
  );
}
