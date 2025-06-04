import React, { useState, useEffect } from "react";
import { PropertyFilterOptions } from "@/types/PropertyFilterOptions";
import { Slider } from "primereact/slider";
import { OptionItem, usePaginatedOptions } from "../hooks/usePaginatedOptions";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { FilterOptionItems } from "./shared/FilterOptionItems";

interface Props {
  onApply: (filters: PropertyFilterOptions) => void;
  onClose: () => void;
  filters: PropertyFilterOptions;
  onClear: () => void;
  visible: boolean;
}

const MIN_PRICE = 0;
const MAX_PRICE = 10000;

export default function FilterPopup({
  filters,
  onApply,
  onClose,
  onClear,
  visible,
}: Props) {
  const [localFilters, setLocalFilters] =
    useState<PropertyFilterOptions>(filters);
  const {
    options: amenities,
    loading: amenitiesLoading,
    error: amenitiesError,
    fetchedAll: fetchedAllAmenities,
    showAllOptions: showAllAmenities,
  } = usePaginatedOptions<OptionItem>("/api/amenities");

  const {
    options: categories,
    loading: categoriesLoading,
    error: categoriesError,
    fetchedAll: fetchedAllCategories,
    showAllOptions: showAllCategories,
  } = usePaginatedOptions<OptionItem>("/api/categories");

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters, visible]);

  const priceRange: [number, number] = [
    localFilters.minPrice ?? MIN_PRICE,
    localFilters.maxPrice ?? MAX_PRICE,
  ];

  const handlePriceChange = (event: any) => {
    if (Array.isArray(event.value)) {
      setLocalFilters((prev) => ({
        ...prev,
        minPrice: event.value[0],
        maxPrice: event.value[1],
      }));
    }
  };

  const handleClear = () => {
    setLocalFilters({
      minPrice: undefined,
      maxPrice: undefined,
      propertyType: undefined,
      amenityNames: [],
      categoryNames: [],
    });
    onClear();
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex bg-black/50 bg-opacity-20 items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[80%] shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Filters</h2>
          <button
            onClick={onClose}
            className="text-gray-500 font-bold text-xl hover:text-gray-800"
          >
            <span className="p-0 m-0 cursor-pointer">&#x2715;</span>
          </button>
        </div>
        <div className="overflow-y-auto max-h-[60vh]">
          {/*  Categories filter */}
          <div className="mb-3">
            <label className="font-semibold">Categories</label>
            <FilterOptionItems
              options={categories}
              selectedNames={localFilters.categoryNames ?? []}
              onToggle={(name) => {
                setLocalFilters((prev) => {
                  const selected = prev.categoryNames?.includes(name);
                  return {
                    ...prev,
                    categoryNames: selected
                      ? (prev.categoryNames ?? []).filter((c) => c !== name)
                      : [...(prev.categoryNames ?? []), name],
                  };
                });
              }}
              loading={categoriesLoading}
              error={categoriesError}
              fetchedAll={fetchedAllCategories}
              onShowAll={showAllCategories}
              showAllThreshold={8}
              label="Show all categories"
            />
          </div>

          {/* Price range */}
          <div className="mb-3">
            <label className="font-semibold">Price Range</label>
            <div className="px-2 mx-1 py-4">
              <Slider
                value={priceRange}
                onChange={handlePriceChange}
                range
                min={MIN_PRICE}
                max={MAX_PRICE}
                step={10}
                className="w-full"
              />
              <div className="flex justify-between mt-2 text-sm text-gray-600">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </div>

          {/* Amenities filter */}
          <div className="mb-3">
            <label className="font-semibold">Amenities</label>
            <FilterOptionItems
              options={amenities}
              selectedNames={localFilters.amenityNames ?? []}
              onToggle={(name) => {
                setLocalFilters((prev) => {
                  const selected = prev.amenityNames?.includes(name);
                  return {
                    ...prev,
                    amenityNames: selected
                      ? (prev.amenityNames ?? []).filter((a) => a !== name)
                      : [...(prev.amenityNames ?? []), name],
                  };
                });
              }}
              loading={amenitiesLoading}
              error={amenitiesError}
              fetchedAll={fetchedAllAmenities}
              onShowAll={showAllAmenities}
              showAllThreshold={8}
              label="Show all"
            />
          </div>
        </div>
        {/* Action buttons */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={handleClear}
            className="px-4 py-2 rounded bg-gray-200"
          >
            Clear
          </button>
          <button
            onClick={() => onApply(localFilters)}
            className="px-4 py-2 rounded bg-blue-500 text-white"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
