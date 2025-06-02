import { useQuery } from "@tanstack/react-query";

import { fetchHostListingRevenue } from "../data/fetch-host-listing-revenue";

export function useHostListingRevenue(hostId: string) {
  const query = useQuery({
    queryKey: ["host-listing-revenue", hostId],
    queryFn: () => fetchHostListingRevenue(hostId),
    enabled: !!hostId,
  });
  return query;
}
