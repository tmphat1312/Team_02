"use client";

import { Grid } from "@/components/layout/grid";
import { Stack } from "@/components/layout/stack";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserContext } from "@/features/auth/contexts/UserContext";
import { useHostListingRevenue } from "@/features/reporting/hooks/use-host-listing-revenue";
import { formatPrice } from "@/lib/utils";

export function ListingRevenue() {
  const host = useUserContext();
  const { isLoading, data: listingRevenue } = useHostListingRevenue(host.id);

  if (isLoading) {
    return (
      <Grid className="grid-cols-3 gap-x-6 gap-y-4 items-stretch">
        {Array.from({ length: 12 }).map((_, i) => (
          <Skeleton key={i} className="h-18 rounded-lg" />
        ))}
      </Grid>
    );
  }

  if (!listingRevenue) {
    return null;
  }

  return (
    <ul className="grid grid-cols-3 gap-x-6 gap-y-4 items-stretch">
      {listingRevenue.map((item) => (
        <li key={item.id}>
          <Stack className="h-full justify-between gap-4 rounded-lg border shadow p-3">
            <span className="text-pretty font-semibold">{item.title}</span>
            <span className="text-green-500 font-medium ">
              {formatPrice(item.totalRevenue)}
            </span>
          </Stack>
        </li>
      ))}
    </ul>
  );
}
