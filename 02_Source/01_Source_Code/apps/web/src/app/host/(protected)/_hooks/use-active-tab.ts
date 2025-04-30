import { useQueryState, parseAsStringEnum } from "nuqs";

export function useActiveTab() {
  return useQueryState(
    "active-tab",
    parseAsStringEnum([
      "checking-out",
      "upcoming",
      "arriving-soon",
      "pending-review",
    ]).withDefault("checking-out")
  );
}
