import { fetchHostReservations } from "@/features/reservation/data/fetch-host-reservations";
import {
  queryOptions as makeQueryOptions,
  useQuery,
} from "@tanstack/react-query";

const queryOptions = (hostId: string) =>
  makeQueryOptions({
    queryKey: ["host-reservations", hostId],
    queryFn: () => fetchHostReservations(hostId),
  });

export function useHostReservations(hostId: string) {
  const query = useQuery(queryOptions(hostId));
  return query;
}

export { queryOptions as makeHostReservationsQueryOptions };
