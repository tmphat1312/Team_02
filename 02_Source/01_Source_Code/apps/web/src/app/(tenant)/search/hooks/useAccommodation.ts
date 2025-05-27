import useSWR, { preload } from "swr";
import { useState } from "react";
import Accommodation from "@/types/Accommodation";
import { searchClient } from "@/lib/search-client";

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
}: {
  lat: number;
  lng: number;
  radius: number;
  page: number;
  pageSize: number;
}) =>
  // `/api/accommodations/nearby?lat=${lat}&lng=${lng}&radius=${radius}&page=${page-1}&size=${pageSize}`;
`/api/properties/search?lat=${lat}&lng=${lng}&radiusKm=${radius}&page=${page-1}&size=${pageSize}`;

export function useAccommodations({
  lat,
  lng,
  radius,
  pageSize,
}: {
  lat: number;
  lng: number;
  radius: number;
  pageSize: number;
}) {
  // console.log("use Accommodations:", {radius})
  const [page, setPage] = useState<number>(1);
  const { isLoading, error, data } = useSWR(
    fetchKey({ lat, lng, radius, page, pageSize }),
    fetcher
  );

  if (data) {
    if (page - 1 > 0) {
      preload(
        fetchKey({ lat, lng, radius, page: page - 1, pageSize }),
        fetcher
      );
    }

    if (page + 1 <= data.pagination.totalPages) {
      preload(
        fetchKey({ lat, lng, radius, page: page + 1, pageSize }),
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
