import { useEffect, useState, useCallback } from "react";
import { searchClient } from "@/lib/search-client";

export interface OptionItem {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
}

const INITIAL_SIZE = 8;

export function usePaginatedOptions<T extends OptionItem>(
  endpoint: string,
  initialSize = INITIAL_SIZE
) {
  const [options, setOptions] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetchedAll, setFetchedAll] = useState(false);

  const fetchOptions = useCallback(
    async (size: number) => {
      setLoading(true);
      try {
        const res = await searchClient.get(
          `${endpoint}?page=0&size=${size}&sort=name,asc`
        );
        setOptions(res.data.content || []);
        setLoading(false);
      } catch {
        setError("Failed to fetch options");
        setLoading(false);
      }
    },
    [endpoint]
  );

  useEffect(() => {
    fetchOptions(initialSize);
  }, [fetchOptions, initialSize]);

  const showAllOptions = async () => {
    setFetchedAll(true);
    await fetchOptions(1000); // or a large enough number to get all
  };

  return { options, loading, error, fetchedAll, showAllOptions };
}

// For backward compatibility
export interface Amenity extends OptionItem {}
export function useAmenities() {
  const { options, loading, error, fetchedAll, showAllOptions } =
    usePaginatedOptions<Amenity>("/api/amenities");
  return {
    amenities: options,
    loading,
    error,
    fetchedAll,
    showAllAmenities: showAllOptions,
  };
}
