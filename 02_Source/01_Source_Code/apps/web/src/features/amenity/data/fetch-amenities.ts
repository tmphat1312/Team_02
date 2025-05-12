import { httpClient } from "@/lib/http-client";
import { Amenity } from "@/typings/models";

export async function fetchAmenities(): Promise<Amenity[]> {
  const response = await httpClient.get("/amenities?pageSize=1000");
  return response.data.data;
}
