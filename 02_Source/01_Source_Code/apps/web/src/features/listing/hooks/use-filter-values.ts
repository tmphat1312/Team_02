import {
  parseAsInteger,
  useQueryStates,
  parseAsArrayOf,
  parseAsFloat,
} from "nuqs";

export function useFilterValues() {
  return useQueryStates({
    lat: parseAsFloat,
    lng: parseAsFloat,
    priceMin: parseAsInteger,
    priceMax: parseAsInteger,
    categoryId: parseAsInteger,
    noBedroomsMin: parseAsInteger,
    noBedsMin: parseAsInteger,
    noBathroomsMin: parseAsInteger,
    noGuestsMin: parseAsInteger,
    amenityIds: parseAsArrayOf({
      parse: (value) => Number(value),
    }),
  });
}
