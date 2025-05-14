import useSWRInfinite from "swr/infinite";

import { http } from "@/lib/http";

import { PAGE_SIZE } from "../config/settings";
import { useFilterValues } from "./use-filter-values";

const fetcher = (path: string) => http.get(path).then((res) => res.data);

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
    searchParams.append("noBathroomsMin", noBathroomsMin.toString());
  if (noBedroomsMin)
    searchParams.append("noBedroomsMin", noBedroomsMin.toString());
  if (noBedsMin) searchParams.append("noBedsMin", noBedsMin.toString());

  searchParams.append("page", page.toString());
  searchParams.append("pageSize", pageSize.toString());

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
  const lastPage = data?.at(-1);
  const isReachingEnd =
    isEmpty || (lastPage && lastPage.metadata.pagination.totalPages <= size);
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
