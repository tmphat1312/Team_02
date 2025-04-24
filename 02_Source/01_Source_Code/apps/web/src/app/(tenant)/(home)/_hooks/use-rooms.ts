import useSWRInfinite from "swr/infinite";

import { mockHttpClient } from "@/lib/http-client";

import { useFilterValues } from "./use-filter-values";

import { PAGE_SIZE } from "../_config/settings";

const fetcher = (path: string) =>
  mockHttpClient.get(path).then((res) => res.data);

const fetchKey = ({
  categoryId,
  amenityIds,
  priceMax,
  priceMin,
  noBathroomsMin,
  noBedroomsMin,
  noBedsMin,
  page,
  pageSize,
}: {
  categoryId: number | null;
  amenityIds: number[] | null;
  priceMax: number | null;
  priceMin: number | null;
  noBathroomsMin: number | null;
  noBedroomsMin: number | null;
  noBedsMin: number | null;
  page: number;
  pageSize: number;
}) => {
  const searchParams = new URLSearchParams();
  if (categoryId) searchParams.append("categoryId", categoryId.toString());
  if (amenityIds && amenityIds.length > 0)
    searchParams.append("amenityIds", amenityIds.join(","));
  if (priceMax) searchParams.append("priceMax", priceMax.toString());
  if (priceMin) searchParams.append("priceMin", priceMin.toString());
  if (noBathroomsMin)
    searchParams.append("noBathrooms", noBathroomsMin.toString());
  if (noBedroomsMin)
    searchParams.append("noBedrooms", noBedroomsMin.toString());
  if (noBedsMin) searchParams.append("noBeds", noBedsMin.toString());

  searchParams.append("_page", page.toString());
  searchParams.append("_per_page", pageSize.toString());

  return `/properties?${searchParams}`;
};

export function useRooms() {
  const [
    {
      categoryId,
      amenityIds,
      priceMax,
      priceMin,
      noBathroomsMin,
      noBedroomsMin,
      noBedsMin,
    },
  ] = useFilterValues();
  const { data, mutate, size, setSize, isValidating, isLoading } =
    useSWRInfinite(
      (index) =>
        fetchKey({
          categoryId,
          amenityIds,
          priceMax,
          priceMin,
          noBathroomsMin,
          noBedroomsMin,
          noBedsMin,
          page: index + 1,
          pageSize: PAGE_SIZE,
        }),
      fetcher
    );

  const properties = (data ?? []).flatMap((page) => page.data);
  const isEmpty = data && properties.length === 0;
  const lastPage = data?.[data.length - 1];
  const isReachingEnd = isEmpty || (lastPage && lastPage.last <= size);
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");

  const loadMore = () => {
    if (isLoadingMore || isReachingEnd) return;
    setSize(size + 1);
  };

  return {
    properties,
    isEmpty,
    isLoading,
    isValidating,
    isReachingEnd,
    isLoadingMore,
    size,
    setSize,
    mutate,
    loadMore,
  };
}
