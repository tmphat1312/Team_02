import { parseAsInteger, useQueryState } from 'nuqs';
import useSWR, { preload } from 'swr';

import { axiosClient } from '../../../lib/axios-client';

type Amenity = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
};

type Pagination = {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};

const fetcher = (url: string) =>
  axiosClient.get(url).then(({ data: axiosData }) => ({
    amenities: axiosData.data as Amenity[],
    pagination: axiosData.metadata.pagination as Pagination,
  }));

const fetchKey = ({ page }: { page: number }) =>
  `/amenities?page=${page}&pageSize=5`;

export function useAmenities() {
  const [page] = useQueryState('page', parseAsInteger.withDefault(1));
  const { isLoading, error, data, mutate } = useSWR(
    fetchKey({ page }),
    fetcher
  );

  console.log(data);

  if (data) {
    if (page - 1 > 0) {
      preload(fetchKey({ page: page - 1 }), fetcher);
    }

    if (page + 1 <= data.pagination.totalPages) {
      preload(fetchKey({ page: page + 1 }), fetcher);
    }
  }

  const amenities = data?.amenities || [];
  const pagination = data?.pagination || {
    page: 0,
    pageSize: 0,
    totalItems: 0,
    totalPages: 0,
  };
  const revalidateAmenities = mutate;

  return {
    isLoading,
    error,
    amenities,
    pagination,
    revalidateAmenities,
  };
}
