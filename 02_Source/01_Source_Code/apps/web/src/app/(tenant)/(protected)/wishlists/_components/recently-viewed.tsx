"use client";

import { useLiveQuery } from "dexie-react-hooks";

import { getRecentlyViewed } from "../_data/crud";
import { ListFallback } from "./list-fallback";
import { PageSection } from "./page-section";
import { RecentlyViewedCard } from "./recently-viewed-card";

export function RecentlyViewed() {
  const recentlyViewedList = useLiveQuery(getRecentlyViewed);

  const isLoading = recentlyViewedList == undefined;

  if (isLoading) {
    return (
      <PageSection heading="Recently Viewed">
        <ListFallback />
      </PageSection>
    );
  }

  if (recentlyViewedList.length === 0) {
    return (
      <PageSection heading="Recently Viewed">
        <p className="text-lg text-gray-500">No recently viewed items.</p>
      </PageSection>
    );
  }

  return (
    <PageSection heading="Recently Viewed">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-8">
        {recentlyViewedList.map((item) => (
          <RecentlyViewedCard key={item.id} item={item} />
        ))}
      </div>
    </PageSection>
  );
}
