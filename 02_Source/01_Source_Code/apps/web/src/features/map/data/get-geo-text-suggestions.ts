import { env } from "@/env";

type Suggestion = {
  name: string;
  mapbox_id: string;
  feature_type: string;
  address: string;
  full_address: string;
  place_formatted: string;
  context: {
    country: {
      name: string;
      country_code: string;
      country_code_alpha_3: string;
    };
    postcode: { id: string; name: string };
    place: { id: string; name: string };
    neighborhood: { id: string; name: string };
    address: {
      name: string;
      address_number: string;
      street_name: string;
    };
    street: { name: string };
  };
};

export async function getGeoTextSuggestions(
  query: string
): Promise<Suggestion[]> {
  const response = await fetch(
    `https://api.mapbox.com/search/searchbox/v1/suggest?q=${encodeURIComponent(
      query
    )}&session_token=04221df3-d54c-4b41-896c-80219450c531&proximity=-73.990593%2C40.740121&access_token=${
      env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
    }`
  );
  const json = await response.json();
  return json.suggestions;
}
