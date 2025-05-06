import { Suspense } from "react";

import { Page } from "@/components/layout/page";
import { fetchAmenities } from "@/features/listing/data/fetch-amenities";
import { fetchCategories } from "@/features/listing/data/fetch-categories";

import {
  CategoryList,
  CategoryListFallback,
} from "./_components/filters/category-list";
import { FiltersDialog } from "./_components/filters/filter-dialog";
import { FilterDialogContent } from "./_components/filters/filter-dialog-content";
import { Filters } from "./_components/filters/filters";
import { RoomList, RoomListFallback } from "./_components/room-list";

export default function Home() {
  const categoriesPromise = fetchCategories();
  const amenitiesPromise = fetchAmenities();

  return (
    <Page className="pt-0 pb-8">
      <Filters>
        <Suspense fallback={<CategoryListFallback />}>
          <CategoryList categoriesPromise={categoriesPromise} />
        </Suspense>
        <FiltersDialog>
          <FilterDialogContent amenitiesPromise={amenitiesPromise} />
        </FiltersDialog>
      </Filters>
      <Suspense fallback={<RoomListFallback />}>
        <RoomList />
      </Suspense>
    </Page>
  );
}
