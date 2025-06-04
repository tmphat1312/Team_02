import React, { useState, useEffect } from "react";
import { PropertyFilterOptions } from "@/types/PropertyFilterOptions";
import { Slider } from "primereact/slider";
import { useAmenities } from "../hooks/useAmenities";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";

interface Props {
  onApply: (filters: PropertyFilterOptions) => void;
  onClose: () => void;
  filters: PropertyFilterOptions;
  onClear: () => void;
  visible: boolean;
}

const propertyTypes = ["Apartment", "House", "Villa"];
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
    amenities,
    loading: amenitiesLoading,
    error: amenitiesError,
    fetchedAll,
    showAllAmenities,
  } = useAmenities();

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

  const handleChange = (changed: Partial<PropertyFilterOptions>) => {
    setLocalFilters((prev) => ({ ...prev, ...changed }));
  };

  const handleClear = () => {
    setLocalFilters({
      minPrice: undefined,
      maxPrice: undefined,
      propertyType: undefined,
      amenityNames: [],
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
          {/* Properties type */}
          <div className="mb-3">
            <label className="font-semibold">Property Type</label>
            <select
              value={localFilters.propertyType ?? ""}
              onChange={(e) => handleChange({ propertyType: e.target.value })}
              className="w-full border rounded p-1"
            >
              <option value="">Any</option>
              {propertyTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
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
            <div className="flex flex-wrap gap-2">
              {amenitiesLoading && <span>Loading amenities...</span>}
              {amenitiesError && (
                <span className="text-red-500">{amenitiesError}</span>
              )}
              {!amenitiesLoading &&
                !amenitiesError &&
                amenities.map((am) => {
                  const selected = localFilters.amenityNames?.includes(am.name);
                  return (
                    <button
                      type="button"
                      key={am.id}
                      onClick={() => {
                        setLocalFilters((prev) => ({
                          ...prev,
                          amenityNames: selected
                            ? (prev.amenityNames ?? []).filter(
                                (a) => a !== am.name
                              )
                            : [...(prev.amenityNames ?? []), am.name],
                        }));
                      }}
                      className={`flex items-center gap-1 border rounded px-2 py-1 cursor-pointer transition-colors duration-150 focus:outline-none ${
                        selected
                          ? "border-orange-500 ring-1 ring-orange-400 bg-orange-50"
                          : "border-gray-300 bg-white hover:border-orange-300"
                      }`}
                      style={{ borderWidth: 2 }}
                    >
                      <img
                        src={am.imageUrl}
                        alt={am.name}
                        className="w-6 h-6 object-cover rounded"
                      />
                      <span>{am.name}</span>
                    </button>
                  );
                })}
              {!fetchedAll && amenities.length <= 8 && (
                <button
                  type="button"
                  onClick={showAllAmenities}
                  className="ml-2 px-2 py-1 text-md bg-gray-300 rounded border"
                >
                  Show all &rarr;
                </button>
              )}
            </div>
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
