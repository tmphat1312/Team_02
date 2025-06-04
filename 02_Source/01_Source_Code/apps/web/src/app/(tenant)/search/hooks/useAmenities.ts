import { useEffect, useState, useCallback } from "react";
import { searchClient } from "@/lib/search-client";

export interface Amenity {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
}

const INITIAL_SIZE = 8;

export function useAmenities() {
  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetchedAll, setFetchedAll] = useState(false);

  const fetchAmenities = useCallback(async (size: number) => {
    setLoading(true);
    try {
      const res = await searchClient.get(`/api/amenities?page=0&size=${size}&sort=name,asc`);
      setAmenities(res.data.content || []);
      setLoading(false);
    } catch {
      setError("Failed to fetch amenities");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAmenities(INITIAL_SIZE);
  }, [fetchAmenities]);

  const showAllAmenities = async () => {
    setFetchedAll(true);
    await fetchAmenities(1000); // or a large enough number to get all
  };

  return { amenities, loading, error, fetchedAll, showAllAmenities };
}