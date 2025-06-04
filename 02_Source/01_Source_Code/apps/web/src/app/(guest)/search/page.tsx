"use client";

import { useState, useRef } from "react";
import Accommodation from "@/types/Accommodation";
import Coordinates from "@/types/Coordinates";
import { BeatLoader } from "react-spinners";
import { Skeleton } from "primereact/skeleton";
import { Paginator } from "primereact/paginator";
import { useAccommodations } from "./hooks/useAccommodation";
import SearchBar from "./components/SearchBar";
import AccommodationList from "./components/AccommodationList";
import AccommodationCard from "./components/AccommodationCard";
import MapboxMap from "./components/MapBoxMap";
import { useFilter } from "./hooks/useFilter";
import FilterPopup from "./components/FilterPopup";
import { PropertyFilterOptions } from "@/types/PropertyFilterOptions";

export default function SearchPage() {
  const [selectedAcc, setSelectedAcc] = useState<Accommodation | null>(null);
  const [center, setCenter] = useState<Coordinates>({
    lat: 10.824411,
    lng: 106.629401,
  }); // default coordinates
  const [radius, setRadius] = useState<number>(500);
  const [filterVisible, setFilterVisible] = useState(false);
  const { filters, updateFilters, clearFilters } = useFilter();
  const pageSize = 20;
  const { accommodations, pagination, isLoading, setPage } = useAccommodations({
    lat: center.lat,
    lng: center.lng,
    radius,
    pageSize,
    filters,
  });

  const handleApplyFilters = (newFilters: PropertyFilterOptions) => {
    updateFilters(newFilters);
    setFilterVisible(false);
    console.log("Filters applied:", filters);
  };

  const onPageChange = (event: {
    first: number;
    rows: number;
    page: number;
  }) => {
    setPage(event.page + 1); // Update the page using setPage
    window.history.pushState(null, "", `?page=${event.page + 1}`);
  };

  // Handle map changes
  const handleMapChange = (lat: number, lng: number, newRadius: number) => {
    setCenter({ lat, lng });
    setRadius(newRadius);
  };

  return (
    <div className="relative flex gap-6 h-full w-full mx-auto container">
      {/* Left panel: display the list of accommodations */}
      <div className="h-full w-3/5 py-4">
        {/* Search bar */}
        <div className="flex gap-2">
          <SearchBar onSelect={setCenter} />
          <button
            onClick={() => setFilterVisible(true)}
            className="relative mb-2 px-2 py-2 bg-gray-100 rounded"
          >
            <div>
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
                  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                />
              </svg>
            </div>

            {((filters.minPrice && filters.minPrice > 0) ||
              !!filters.propertyType ||
              filters.amenityNames.length > 0) && (
              <span className="top-0 right-0 translate-x-1/2 -translate-y-1/2 absolute ml-1 h-4 w-4 p-1 text-sm bg-green-600 rounded-full text-white flex items-center justify-center">
                {/* Show count of active filters */}
                {+!!filters.minPrice +
                  +!!filters.propertyType +
                  filters.amenityNames.length}
              </span>
            )}
          </button>
        </div>

        {isLoading ? (
          // Loading animation
          <div className="py-4 grid grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="p-2 border border-gray-300 rounded-lg shadow-sm"
              >
                <div className="flex flex-col justify-center items-center gap-4">
                  <div className="w-full h-[150px]">
                    <Skeleton shape="rectangle" width="100%" height="100%" />
                  </div>
                  <div className="w-full flex gap-2">
                    <Skeleton width="75%" height="1.5rem" />
                  </div>
                  <div className="w-full flex gap-2">
                    <Skeleton width="50%" height="1.5rem" />
                    <Skeleton width="25%" height="1.5rem" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <h2 className="text-lg font-semibold my-2">Accommodations</h2>
            {accommodations.length > 0 && (
              <p className="my-2">
                {accommodations.length > 100 && <span>Over </span>}{" "}
                {accommodations.length} results
              </p>
            )}
            <AccommodationList items={accommodations} />

            {/* Pagination */}
            {pagination.totalItems > pageSize && (
              <div className="mt-4">
                <Paginator
                  first={(pagination.page - 1) * pageSize}
                  rows={pageSize}
                  totalRecords={pagination.totalItems}
                  onPageChange={onPageChange}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right panel */}
      <div className="sticky border top-0 w-2/5 h-[100vh]">
        {/* Loading animation */}
        {isLoading && (
          <div className="absolute top-1/4 left-0 w-full flex items-center justify-center z-9999">
            <div className="bg-white p-2 rounded-lg shadow-lg">
              <BeatLoader color="#000000" size={12} />
            </div>
          </div>
        )}

        <MapboxMap
          accommodations={accommodations}
          onChange={handleMapChange}
          setSelectedAcc={setSelectedAcc}
          centerPoint={center}
          setCenterPoint={setCenter}
        />

        {/* Diplay selected accommodation on Map */}
        {selectedAcc && (
          <div className="absolute top-0 left-0 z-9999 h-full w-full">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="bg-white rounded-xl text-black shadow-lg w-[250px]">
                <AccommodationCard
                  key={selectedAcc.id + "popup"}
                  accommodation={selectedAcc}
                />
                <button
                  onClick={() => setSelectedAcc(null)}
                  className="hover:scale-105 absolute flex items-center justify-center w-6 h-6 right-0 top-0 m-2 p-2 bg-gray-200 text-black rounded-full shadow-sm text-sm"
                >
                  <span className="p-0 m-0 cursor-pointer">&#x2715;</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Filter popup */}
      <FilterPopup
        filters={filters}
        visible={filterVisible}
        onApply={handleApplyFilters}
        onClear={clearFilters}
        onClose={() => setFilterVisible(false)}
      />
    </div>
  );
}
