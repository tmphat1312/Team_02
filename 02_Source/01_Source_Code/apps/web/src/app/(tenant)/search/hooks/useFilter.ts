import { useState } from "react";
import { PropertyFilterOptions } from "@/types/PropertyFilterOptions";

const initialFilters: PropertyFilterOptions = {
  minPrice: undefined,
  maxPrice: undefined,
  propertyType: undefined,
  amenityNames: [],
};

export function useFilter() {
  const [filters, setFilters] = useState<PropertyFilterOptions>(initialFilters);

  const updateFilters = (newFilters: Partial<PropertyFilterOptions>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters(initialFilters);
  };

  return { filters, updateFilters, setFilters, clearFilters };
}