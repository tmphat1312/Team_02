import useSWR, { preload } from "swr";
import { useState } from "react";
import Accommodation from "@/types/Accommodation";
import { searchClient } from "@/lib/search-client";
import { PropertyFilterOptions } from "@/types/PropertyFilterOptions";

type Pagination = {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};

const fetcher = (url: string) =>
  searchClient.get(url).then(({ data }) => ({
    accommodations: data.content as Accommodation[],
    pagination: {
      page: data.pageable.pageNumber + 1,
      pageSize: data.pageable.pageSize,
      totalItems: data.totalElements,
      totalPages: data.totalPages,
    } as Pagination,
  }));

const fetchKey = ({
  lat,
  lng,
  radius,
  page,
  pageSize,
  filters,
}: {
  lat: number;
  lng: number;
  radius: number;
  page: number;
  pageSize: number;
  filters?: PropertyFilterOptions;
}) => {
  const params = new URLSearchParams({
    latitude: lat.toString(),
    longitude: lng.toString(),
    radiusKm: (radius / 1000).toString(),
    page: (page - 1).toString(),
    size: pageSize.toString(),
  });

  if (filters) {
    if (filters.minPrice !== undefined)
      params.append("minPrice", filters.minPrice.toString());
    if (filters.maxPrice !== undefined)
      params.append("maxPrice", filters.maxPrice.toString());
    if (filters.propertyType)
      params.append("propertyType", filters.propertyType);
    if (filters.amenityNames && filters.amenityNames.length > 0) {
      filters.amenityNames.forEach((a) => params.append("amenityNames", a));
    }
  }

  console.log("fetchKey params:", params.toString());

  return `/api/properties/search?${params.toString()}`;
};

export function useAccommodations({
  lat,
  lng,
  radius,
  pageSize,
  filters,
}: {
  lat: number;
  lng: number;
  radius: number;
  pageSize: number;
  filters?: PropertyFilterOptions;
}) {
  // console.log("use Accommodations:", {radius})
  const [page, setPage] = useState<number>(1);
  const { isLoading, error, data } = useSWR(
    fetchKey({ lat, lng, radius, page, pageSize, filters }),
    fetcher
  );

  if (data) {
    if (page - 1 > 0) {
      preload(
        fetchKey({ lat, lng, radius, page: page -1, pageSize, filters }),
        fetcher
      );
    }

    if (page + 1 <= data.pagination.totalPages) {
      preload(
        fetchKey({ lat, lng, radius, page: page + 1, pageSize, filters }),
        fetcher
      );
    }
  }

  const accommodations = data?.accommodations || [];
  const pagination = data?.pagination || {
    page: 0,
    pageSize: 0,
    totalItems: 0,
    totalPages: 0,
  };

  return {
    isLoading,
    error,
    accommodations,
    pagination,
    setPage,
  };
}
