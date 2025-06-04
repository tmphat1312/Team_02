import { fetchCategories } from "@/features/category/data/fetch-categories";
import { getQueryClient } from "@/lib/tanstack-query";
import {
  queryOptions as makeQueryOptions,
  useQuery,
} from "@tanstack/react-query";

const queryOptions = makeQueryOptions({
  queryKey: ["categories"],
  queryFn: () => fetchCategories(),
});

export function prefetchCategories() {
  const queryClient = getQueryClient();
  queryClient.prefetchQuery(queryOptions);
}

export function useCategories() {
  const query = useQuery(queryOptions);
  return query;
}
