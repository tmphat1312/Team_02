import useSWR, { preload } from "swr";

import { fetchCategories } from "@/features/listing/data/fetch-categories";

const QueryKey = "categories";
const fetcher = () => fetchCategories();

export function prefetchCategories() {
  preload(QueryKey, fetcher);
}

export function useCategories() {
  const query = useSWR(QueryKey, fetcher);
  return query;
}
