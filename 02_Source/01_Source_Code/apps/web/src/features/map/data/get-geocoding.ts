import { env } from "@/env";

type GeocodingResponse = {
  id: string;
  geometry: {
    type: string;
    coordinates: [number, number];
  };
  properties: {
    mapbox_id: string;
    feature_type: string;
    full_address: string;
    name: string;
    name_preferred: string;
    coordinates: {
      longitude: number;
      latitude: number;
      accuracy: string;
      routable_points: {
        name: string;
        latitude: number;
        longitude: number;
      }[];
    };
    place_formatted: string;
    context: {
      address: {
        mapbox_id: string;
        address_number: string;
        street_name: string;
        name: string;
      };
      street: {
        mapbox_id: string;
        name: string;
      };
      postcode: {
        mapbox_id: string;
        name: string;
      };
      locality: {
        mapbox_id: string;
        name: string;
        wikidata_id: string;
      };
      place: {
        mapbox_id: string;
        name: string;
        wikidata_id: string;
      };
      district: {
        mapbox_id: string;
        name: string;
        wikidata_id: string;
      };
      region: {
        mapbox_id: string;
        name: string;
        wikidata_id: string;
        region_code: string;
        region_code_full: string;
      };
      country: {
        mapbox_id: string;
        name: string;
        wikidata_id: string;
        country_code: string;
        country_code_alpha_3: string;
      };
    };
  };
};

export async function getGeocoding(
  lng: number,
  lat: number
): Promise<GeocodingResponse> {
  const response = await fetch(
    `https://api.mapbox.com/search/geocode/v6/reverse?longitude=${lng}&latitude=${lat}&access_token=${env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`
  );
  const json = await response.json();
  return json.features[0];
}
