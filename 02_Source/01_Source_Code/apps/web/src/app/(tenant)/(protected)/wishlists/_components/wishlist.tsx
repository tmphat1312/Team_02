"use client";

import { useLiveQuery } from "dexie-react-hooks";

import { getWishlists } from "../_data/crud";
import { ListFallback } from "./list-fallback";
import { PageSection } from "./page-section";
import { WishlistCard } from "./wishlist-card";

export function Wishlist() {
  const wishlists = useLiveQuery(getWishlists);

  const isLoading = wishlists == undefined;

  if (isLoading) {
    return (
      <PageSection heading="Wishlists">
        <ListFallback />
      </PageSection>
    );
  }

  if (wishlists.length === 0) {
    return (
      <PageSection heading="Recently Viewed">
        <p className="text-lg text-gray-500">No wishlist items.</p>
      </PageSection>
    );
  }

  return (
    <PageSection heading="Wishlists">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-8">
        {wishlists.map((item) => (
          <WishlistCard key={item.id} item={item} />
        ))}
      </div>
    </PageSection>
  );
}
