import { Suspense } from "react";

import { Page } from "@/components/layout/page";
import { fetchAmenities } from "@/features/listing/data/fetch-amenities";
import { fetchCategories } from "@/features/listing/data/fetch-categories";

import {
  CategoryList,
  CategoryListFallback,
} from "./components/filters/category-list";
import { FiltersDialog } from "./components/filters/filter-dialog";
import { FilterDialogContent } from "./components/filters/filter-dialog-content";
import { Filters } from "./components/filters/filters";
import { RoomList, RoomListFallback } from "./components/room-list";
import { SearchLayout } from "./components/search-layout";
import { SearchBar } from "./components/search/search-bar";

export const dynamic = "force-dynamic";

export default async function Home() {
  const categoriesPromise = fetchCategories();
  const amenitiesPromise = fetchAmenities();

  return (
    <Page className="pt-0 pb-8">
      <Suspense fallback={null}>
        <SearchBar />
      </Suspense>
      <Filters>
        <Suspense fallback={<CategoryListFallback />}>
          <CategoryList categoriesPromise={categoriesPromise} />
        </Suspense>
        <FiltersDialog>
          <FilterDialogContent amenitiesPromise={amenitiesPromise} />
        </FiltersDialog>
      </Filters>
      <Suspense fallback={null}>
        <SearchLayout>
          <Suspense fallback={<RoomListFallback />}>
            <RoomList />
          </Suspense>
        </SearchLayout>
      </Suspense>
    </Page>
  );
}
