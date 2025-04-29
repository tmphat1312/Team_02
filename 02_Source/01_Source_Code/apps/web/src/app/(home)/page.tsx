import { Suspense } from "react";

import {
  CategoryList,
  CategoryListFallback,
} from "./_components/filters/category-list";
import { FiltersDialog } from "./_components/filters/filter-dialog";
import { FilterDialogContent } from "./_components/filters/filter-dialog-content";
import { Filters } from "./_components/filters/filters";
import { RoomList, RoomListFallback } from "./_components/room-list";

import { fetchAmenities } from "./_data/fetch-amenities";
import { fetchCategories } from "./_data/fetch-categories";

export default function Home() {
  const categoriesPromise = fetchCategories();
  const amenitiesPromise = fetchAmenities();

  return (
    <>
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
    </>
  );
}
