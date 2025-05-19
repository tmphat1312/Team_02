import { parseAsInteger, useQueryStates, parseAsArrayOf } from "nuqs";

export function useFilterValues() {
  return useQueryStates({
    priceMin: parseAsInteger,
    priceMax: parseAsInteger,
    categoryId: parseAsInteger,
    noBedroomsMin: parseAsInteger,
    noBedsMin: parseAsInteger,
    noBathroomsMin: parseAsInteger,
    amenityIds: parseAsArrayOf({
      parse: (value) => Number(value),
    }),
  });
}
