import { useQueryState, parseAsInteger } from 'nuqs';
import useSWR, { preload } from 'swr';

import { axiosClient } from '../../../lib/axios-client';

const fetcher = (url: string) =>
  axiosClient.get(url).then((r) => ({
    categories: r.data.data,
    pagination: r.data.metadata.pagination,
  }));

export function useCategories() {
  const [page] = useQueryState('page', parseAsInteger.withDefault(1));

  const { isLoading, error, data } = useSWR(
    `/categories?page=${page}`,
    fetcher
  );
  const { categories = [], pagination = {} } = data ?? {};

  if (page - 1 > 0) {
    preload(`/categories?page=${page - 1}`, fetcher);
  }

  if (page + 1 <= pagination.totalPages) {
    preload(`/categories?page=${page + 1}`, fetcher);
  }

  return {
    isLoading,
    error,
    categories,
    pagination,
  };
}
