import { useQueryState, parseAsInteger } from 'nuqs';
import useSWR from 'swr';

const fetcher = (url: string) =>
  fetch(url)
    .then((r) => r.json())
    .then((r) => ({
      categories: r.data,
      pagination: r.metadata.pagination,
    }));

export function useCategories() {
  const [page] = useQueryState('page', parseAsInteger.withDefault(1));

  const { isLoading, error, data } = useSWR(
    `http://localhost:3001/categories?page=${page}`,
    fetcher
  );

  return {
    isLoading,
    error,
    categories: data?.categories ?? [],
    pagination: data?.pagination ?? {},
  };
}
