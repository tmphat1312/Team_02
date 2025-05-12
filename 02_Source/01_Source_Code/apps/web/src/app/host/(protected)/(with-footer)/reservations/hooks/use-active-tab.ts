import { useQueryState, parseAsStringEnum } from "nuqs";

export function useActiveTab() {
  return useQueryState(
    "active-tab",
    parseAsStringEnum([
      "all",
      "upcoming",
      "completed",
      "cancelled",
    ]).withDefault("all")
  );
}
