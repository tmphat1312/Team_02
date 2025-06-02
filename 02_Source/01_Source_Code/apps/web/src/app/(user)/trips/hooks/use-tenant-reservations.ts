import { fetchTenantReservations } from "@/features/reservation/data/fetch-tenant-reservations";
import {
  queryOptions as makeQueryOptions,
  useQuery,
} from "@tanstack/react-query";

const queryOptions = (tenantId: string) =>
  makeQueryOptions({
    queryKey: ["tenant-reservations", tenantId],
    queryFn: () => fetchTenantReservations(tenantId),
  });

export function useTenantReservations(tenantId: string) {
  const query = useQuery(queryOptions(tenantId));
  return query;
}

export { queryOptions as makeTenantReservationsQueryOptions };
