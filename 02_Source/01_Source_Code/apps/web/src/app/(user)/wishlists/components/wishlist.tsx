"use client";

import { useLiveQuery } from "dexie-react-hooks";

import { Grid } from "@/components/layout/grid";
import { PageSubHeading } from "@/components/typography/page-sub-heading";
import { TextAlert } from "@/components/typography/text-alert";

import { getWishlists } from "../data/crud";
import { ListFallback } from "./list-fallback";
import { WishlistCard } from "./wishlist-card";

export function Wishlist() {
  const wishlists = useLiveQuery(getWishlists);

  const isLoading = wishlists == undefined;
  const isEmpty = wishlists?.length === 0;

  const children = isLoading ? (
    <ListFallback />
  ) : isEmpty ? (
    <TextAlert>No wishlist items.</TextAlert>
  ) : (
    <Grid className="gap-8 grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
      {wishlists.map((item) => (
        <WishlistCard key={item.id} item={item} />
      ))}
    </Grid>
  );
  return (
    <section>
      <PageSubHeading>Wishlists</PageSubHeading>
      {children}
    </section>
  );
}
