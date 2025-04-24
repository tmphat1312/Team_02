"use client";

import { useLiveQuery } from "dexie-react-hooks";

import { getRecentlyViewed } from "../_data/crud";
import { PageSection } from "./page-section";
import { RecentlyViewedCard } from "./recently-viewed-card";

export function RecentlyViewed() {
  const recentlyViewedList = useLiveQuery(getRecentlyViewed);

  if (!recentlyViewedList) {
    return (
      <PageSection heading="Recently Viewed">
        <p className="text-muted-foreground">Loading...</p>
      </PageSection>
    );
  }

  return (
    <PageSection heading="Recently Viewed">
      <div className="flex flex-wrap gap-8">
        {recentlyViewedList.map((item) => (
          <RecentlyViewedCard key={item.id} item={item} />
        ))}
      </div>
    </PageSection>
  );
}
