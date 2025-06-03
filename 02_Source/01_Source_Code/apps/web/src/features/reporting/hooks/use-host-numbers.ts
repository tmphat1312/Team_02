import { useQuery } from "@tanstack/react-query";

import { fetchHostNumbers } from "../data/fetch-host-numbers";

export function useHostNumbers(hostId: string) {
  const query = useQuery({
    queryKey: ["host-numbers", hostId],
    queryFn: () => fetchHostNumbers(hostId),
    enabled: !!hostId,
  });
  return query;
}
