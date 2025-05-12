import useSWR, { preload } from "swr";

import { fetchAmenities } from "@/features/listing/data/fetch-amenities";

const QueryKey = "amenities";
const fetcher = () => fetchAmenities();

export function prefetchAmenities() {
  preload(QueryKey, fetcher);
}

export function useAmenities() {
  const query = useSWR(QueryKey, fetcher);
  return query;
}
