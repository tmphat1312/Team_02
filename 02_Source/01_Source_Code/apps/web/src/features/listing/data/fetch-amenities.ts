import { Amenity } from "@/app/typings/models";
import { httpClient } from "@/lib/http-client";

export async function fetchAmenities(): Promise<Amenity[]> {
  const response = await httpClient.get("/amenities", {
    params: {
      pageSize: 1_000,
    },
  });
  return response.data.data;
}
