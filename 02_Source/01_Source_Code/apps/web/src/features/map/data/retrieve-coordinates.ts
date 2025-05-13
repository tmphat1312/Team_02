import { env } from "@/env";

export async function retrieveCoordinates(mapboxId: string): Promise<{
  coordinates: [number, number];
  full_address: string;
}> {
  const response = await fetch(
    `https://api.mapbox.com/search/searchbox/v1/retrieve/${mapboxId}?session_token=04221df3-d54c-4b41-896c-80219450c531&access_token=${env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`
  );
  const json = await response.json();
  return {
    coordinates: json.features[0].geometry.coordinates as [number, number],
    full_address: json.features[0].properties.full_address,
  };
}
