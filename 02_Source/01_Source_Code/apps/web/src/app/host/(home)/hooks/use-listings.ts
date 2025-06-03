import { fetchHostListings } from "@/features/listing/data/fetch-host-listings";
import { User } from "@/typings/models";
import {
  QueryClient,
  queryOptions as makeQueryOptions,
  useQuery,
} from "@tanstack/react-query";

type HostId = User["id"];

const queryOptions = (hostId: HostId) =>
  makeQueryOptions({
    queryKey: ["listings", hostId],
    queryFn: () => fetchHostListings({ hostId }),
  });

export function prefetchListings(hostId: HostId) {
  const queryClient = new QueryClient();
  queryClient.prefetchQuery(queryOptions(hostId));
}

export function useListings(hostId: HostId) {
  const query = useQuery(queryOptions(hostId));
  return query;
}

export const listingsQueryOptions = queryOptions;
