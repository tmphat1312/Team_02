import { fetchCommonRules } from "@/features/rule/data/fetch-common-rules";
import { getQueryClient } from "@/lib/tanstack-query";
import {
  queryOptions as makeQueryOptions,
  useQuery,
} from "@tanstack/react-query";

const queryOptions = makeQueryOptions({
  queryKey: ["common-rules"],
  queryFn: () => fetchCommonRules(),
});

export function prefetchCommonRules() {
  const queryClient = getQueryClient();
  queryClient.prefetchQuery(queryOptions);
}

export function useCommonRules() {
  const query = useQuery(queryOptions);
  return query;
}
