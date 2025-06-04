import useSWRInfinite from "swr/infinite";

import { fetchPropertyReview } from "@/features/review/data/fetch-property-review";
import { http } from "@/lib/http";
import { calculateAvgRating } from "@/lib/utils";
import { Property } from "@/typings/models";

import { PAGE_SIZE } from "../config/settings";
import { useFilterValues } from "./use-filter-values";

const fetcher = async (path: string) => {
  const { data: httpData } = await http.get(path);
  const properties = httpData.data;

  const propertyWithRatingPromises = properties.map(
    async (property: Property): Promise<Property> => {
      const reviews = await fetchPropertyReview({
        propertyId: property.id,
      });
      const rating =
        reviews.length > 0
          ? reviews.reduce(
              (acc, review) => acc + calculateAvgRating(review),
              0
            ) / reviews.length
          : null;
      return {
        ...property,
        rating,
      };
    }
  );
  const propertiesWithRating = await Promise.all(propertyWithRatingPromises);
  return {
    data: propertiesWithRating,
    metadata: httpData.metadata,
  };
};

const fetchKey = ({
  categoryId,
  amenityIds,
  priceMax,
  priceMin,
  noBathroomsMin,
  noBedroomsMin,
  noBedsMin,
  noGuestsMin,
  lat,
  lng,
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
  noGuestsMin: number | null;
  lat: number | null;
  lng: number | null;
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
  if (noGuestsMin) searchParams.append("noGuestsMin", noGuestsMin.toString());
  if (lat) searchParams.append("lat", lat.toString());
  if (lng) searchParams.append("lng", lng.toString());

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
      lat,
      lng,
      noGuestsMin,
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
          noGuestsMin,
          lat,
          lng,
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
