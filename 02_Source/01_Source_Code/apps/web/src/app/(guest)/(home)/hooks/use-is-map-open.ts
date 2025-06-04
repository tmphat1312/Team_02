import { useQueryState, parseAsFloat } from "nuqs";

export function useIsMapOpen() {
  const [lat] = useQueryState("lat", parseAsFloat);
  const [lng] = useQueryState("lng", parseAsFloat);
  const isMapOpen = lat !== null && lng !== null;
  return { isMapOpen };
}
