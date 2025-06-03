import { fetchAmenities } from "@/features/listing/data/fetch-amenities";
import { getQueryClient } from "@/lib/tanstack-query";
import {
  queryOptions as makeQueryOptions,
  useQuery,
} from "@tanstack/react-query";

const queryOptions = makeQueryOptions({
  queryKey: ["amenities"],
  queryFn: () => fetchAmenities(),
});

export function prefetchAmenities() {
  const queryClient = getQueryClient();
  queryClient.prefetchQuery(queryOptions);
}

export function useAmenities() {
  const query = useQuery(queryOptions);
  return query;
}
