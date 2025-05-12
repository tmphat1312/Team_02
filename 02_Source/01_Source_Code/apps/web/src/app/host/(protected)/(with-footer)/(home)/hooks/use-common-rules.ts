import useSWR, { preload } from "swr";

import { fetchCommonRules } from "@/features/rule/data/fetch-common-rules";

const QueryKey = "commonRules";
const fetcher = () => fetchCommonRules();

export function prefetchCommonRules() {
  preload(QueryKey, fetcher);
}

export function useCommonRules() {
  const query = useSWR(QueryKey, fetcher);
  return query;
}
