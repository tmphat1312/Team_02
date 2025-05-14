"use client";

import { Search } from "lucide-react";
import { useDeferredValue, useReducer, useState } from "react";

import { SearchResults } from "./search-results";

type Props = {
  onAddressChange: (coordinates: [number, number], address: string) => void;
};

export function GeoSearchbox({ onAddressChange }: Props) {
  const [isOpen, toggleIsOpen] = useReducer((state) => !state, false);
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  const handleOnAddressChange = (
    coordinates: [number, number],
    address: string
  ) => {
    toggleIsOpen();
    onAddressChange(coordinates, address);
  };

  return (
    <div
      className="absolute top-2 left-2 text-sm"
      style={{ width: isOpen ? "70%" : "fit-content" }}
    >
      <label className="h-10 flex items-center bg-background px-1.5 py-2 border rounded-md shadow ">
        <button onClick={toggleIsOpen}>
          <Search className="size-4 text-gray-500 mx-2" />
        </button>
        {isOpen && (
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="focus:outline-none w-full ms-2"
          />
        )}
      </label>
      {query.length > 0 && isOpen && (
        <SearchResults
          query={deferredQuery}
          onAddressChange={handleOnAddressChange}
        />
      )}
    </div>
  );
}
