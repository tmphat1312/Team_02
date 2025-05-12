import { PropertyWithReviews } from "@/typings/models";
import { TextAlert } from "@/components/typography/text-alert";

import { Grid } from "@/components/layout/grid";
import { ListingCard } from "./listing-card";

type ListingsProps = {
  items: PropertyWithReviews[];
};

export function Listings({ items }: ListingsProps) {
  if (items.length == 0) {
    return <TextAlert>You have not hosted any listings yet.</TextAlert>;
  }

  return (
    <Grid className="grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
      {items.map((listing) => (
        <ListingCard key={listing.id} item={listing} />
      ))}
    </Grid>
  );
}
