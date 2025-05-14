import { http } from "@/lib/http";
import { Amenity } from "@/typings/models";

export async function fetchAmenities(): Promise<Amenity[]> {
  const response = await http.get("/amenities?pageSize=1000");
  return response.data.data;
}
