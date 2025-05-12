import { Amenity } from "@/typings/models";
import { httpClient } from "@/lib/http-client";

export async function fetchPropertyAmenities(id: number): Promise<Amenity[]> {
  return httpClient
    .get(`/properties/${id}/amenities`)
    .then((res) => res.data.data);
}
