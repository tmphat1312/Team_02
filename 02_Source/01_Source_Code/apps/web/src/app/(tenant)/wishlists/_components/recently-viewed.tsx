"use client";

import { useLiveQuery } from "dexie-react-hooks";

import { Grid } from "@/components/layout/grid";
import { PageSubHeading } from "@/components/typography/page-sub-heading";
import { TextAlert } from "@/components/typography/text-alert";
import { getRecentlyViewed } from "../_data/crud";
import { ListFallback } from "./list-fallback";
import { RecentlyViewedCard } from "./recently-viewed-card";

export function RecentlyViewed() {
  const recentlyViewedList = useLiveQuery(getRecentlyViewed);

  const isLoading = recentlyViewedList == undefined;
  const isEmpty = recentlyViewedList?.length === 0;

  const children = isLoading ? (
    <ListFallback />
  ) : isEmpty ? (
    <TextAlert>No recently viewed items.</TextAlert>
  ) : (
    <Grid className="gap-8 grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
      {recentlyViewedList.map((item) => (
        <RecentlyViewedCard key={item.id} item={item} />
      ))}
    </Grid>
  );

  return (
    <section>
      <PageSubHeading>Recently Viewed</PageSubHeading>
      {children}
    </section>
  );
}
