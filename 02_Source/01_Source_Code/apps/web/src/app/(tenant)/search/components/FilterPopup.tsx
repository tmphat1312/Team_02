import React, { useState, useEffect } from "react";
import { PropertyFilterOptions } from "@/types/PropertyFilterOptions";
import { Slider } from "primereact/slider";
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
const amenities = ["Wifi", "Pool", "Parking", "Air Conditioning"];
const MIN_PRICE = 0;
const MAX_PRICE = 1000;

export default function FilterPopup({ filters, onApply, onClose, onClear, visible }: Props) {
  const [localFilters, setLocalFilters] = useState<PropertyFilterOptions>(filters);

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

  const handleAmenityChange = (am: string, checked: boolean) => {
    setLocalFilters((prev) => ({
      ...prev,
      amenityNames: checked
        ? [...(prev.amenityNames ?? []), am]
        : (prev.amenityNames ?? []).filter((a) => a !== am),
    }));
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
      <div className="bg-white rounded-lg p-6 w-[600px] shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Filters</h2>
          <button
            onClick={onClose}
            className="text-gray-500 font-bold text-xl hover:text-gray-800"
          >
            <span className="p-0 m-0 cursor-pointer">&#x2715;</span>
          </button>
        </div>

        <div className="mb-3">
          <label>Property Type</label>
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

        <div className="mb-3">
          <label>Price Range</label>
          <div className="px-2 py-4">
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

        <div className="mb-3">
          <label>Amenities</label>
          <div className="flex flex-wrap gap-2">
            {amenities.map((am) => (
              <label key={am} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={localFilters.amenityNames?.includes(am)}
                  onChange={(e) => handleAmenityChange(am, e.target.checked)}
                />
                {am}
              </label>
            ))}
          </div>
        </div>
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