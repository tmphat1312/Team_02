"use client";
import Coordinates from "@/types/Coordinates";
import React, { useEffect, useRef, useState } from "react";
import { useGeocodeSearch, Location } from "../hooks/useGeocodeSearch ";

interface SearchBarProps {
  onSelect: (coordinates: Coordinates) => void;
}

export default function SearchBar({ onSelect }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [enableSuggestion, setEnableSuggestion] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionRef = useRef<HTMLUListElement>(null);
  const { results, noResults, loading, search } = useGeocodeSearch();

  const handleSearch = async () => {
    console.log("Searching for:", query);
    search(query);
    setEnableSuggestion(true);
  };

  const handleLocationSelection = (loc: Location) => {
    onSelect({ lat: loc.lat, lng: loc.lon });
    setEnableSuggestion(false);
  };

  const handleFocus = () => {
    if (results.length > 0) {
      setEnableSuggestion(true);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        suggestionRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        !suggestionRef.current.contains(event.target as Node)
      ) {
        setEnableSuggestion(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full">
      {/* Search field */}
      <div className="flex gap-2">
        <input
          type="text"
          ref={inputRef}
          placeholder="Search for a location"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="outline-1 outline-gray-200 p-2 rounded w-full"
          onClick={handleFocus}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 rounded text-white px-4 py-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>
      </div>

      {/* Locations suggestion */}
      <div className="absolute left-0 mt-2 w-full bg-white z-9999">
        {enableSuggestion && results.length > 0 && (
          <ul
            className="border border-gray-200 rounded-md shadow-lg bg-gray-100"
            ref={suggestionRef}
          >
            {noResults ? (
              <li className="p-2 text-gray-500">No results found</li>
            ) : (
              results.map((loc: Location, index: number) => (
                <li
                  key={index}
                  className="flex p-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleLocationSelection(loc)}
                >
                  {loc.name}
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
