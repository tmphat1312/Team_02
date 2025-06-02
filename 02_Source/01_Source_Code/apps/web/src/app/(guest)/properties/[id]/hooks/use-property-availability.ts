import { fetchPropertyAvailability } from "@/features/availability/data/fetch-property-availability";
import {
  queryOptions as makeQueryOptions,
  useQuery,
} from "@tanstack/react-query";

const queryOptions = (propertyId: number) =>
  makeQueryOptions({
    queryKey: ["property-availability", propertyId],
    queryFn: () => fetchPropertyAvailability(propertyId),
  });

export const usePropertyAvailability = (propertyId: number) => {
  const query = useQuery(queryOptions(propertyId));
  return query;
};

export { queryOptions as propertyAvailabilityQueryOptions };
