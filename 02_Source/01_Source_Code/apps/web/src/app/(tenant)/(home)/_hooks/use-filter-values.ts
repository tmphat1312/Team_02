import { parseAsInteger, useQueryStates, parseAsArrayOf } from "nuqs";

export function useFilterValues() {
  return useQueryStates({
    priceMin: parseAsInteger,
    priceMax: parseAsInteger,
    categoryId: parseAsInteger,
    noBedrooms: parseAsInteger,
    noBeds: parseAsInteger,
    noBathrooms: parseAsInteger,
    amenityIds: parseAsArrayOf({
      parse: (value) => Number(value),
    }),
  });
}
