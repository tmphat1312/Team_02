"use client";

import { Grid } from "@/components/layout/grid";
import { TextAlert } from "@/components/typography/text-alert";
import { useUserContext } from "@/features/auth/contexts/UserContext";
import { useQuery } from "@tanstack/react-query";

import { listingsQueryOptions } from "../hooks/use-listings";
import { Listing, ListingFallback } from "./listing";

export function Listings() {
  const host = useUserContext();
  const { data: listings } = useQuery(listingsQueryOptions(host.id));

  if (!listings) {
    return (
      <Grid className="grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <ListingFallback key={index} />
        ))}
      </Grid>
    );
  }

  if (listings.length == 0) {
    return <TextAlert>You have not hosted any listings yet.</TextAlert>;
  }

  return (
    <Grid className="grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
      {listings.map((listing) => (
        <Listing key={listing.id} item={listing} />
      ))}
    </Grid>
  );
}
