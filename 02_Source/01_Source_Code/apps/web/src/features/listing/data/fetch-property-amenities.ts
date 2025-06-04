import { Amenity } from "@/typings/models";
import { http } from "@/lib/http";

export async function fetchPropertyAmenities(id: number): Promise<Amenity[]> {
  return http.get(`/properties/${id}/amenities`).then((res) => res.data.data);
}
