import { useState, useRef } from "react";
import axios from "axios";
import { env } from "@/env";

export interface Location {
  name: string;
  lat: number;
  lon: number;
}

export function useGeocodeSearch() {
  const [results, setResults] = useState<Location[]>([]);
  const [noResults, setNoResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const cancelToken = useRef<ReturnType<typeof axios.CancelToken.source> | null>(null);

  const search = async (query: string) => {
    if (!query) return;
    setLoading(true);
    setNoResults(false);

    // Cancel previous request if any
    if (cancelToken.current) {
      cancelToken.current.cancel();
    }
    cancelToken.current = axios.CancelToken.source();

    try {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json`,
        {
          params: {
            access_token: env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
            autocomplete: true,
          },
          cancelToken: cancelToken.current.token,
        }
      );
      const data = response.data;
      if (data.features.length === 0) {
        setNoResults(true);
        setResults([]);
      } else {
        setNoResults(false);
        setResults(
          data.features.map((feature: any) => ({
            name: feature.place_name,
            lat: feature.geometry.coordinates[1],
            lon: feature.geometry.coordinates[0],
          }))
        );
      }
    } catch (error: any) {
      if (!axios.isCancel(error)) {
        setNoResults(true);
        setResults([]);
      }
    } finally {
      setLoading(false);
    }
  };

  return { results, noResults, loading, search };
}