import { Amenity } from "@/typings/models";
import { http } from "@/lib/http";

export async function fetchAmenities(): Promise<Amenity[]> {
  const response = await http.get("/amenities", {
    params: {
      pageSize: 1_000,
    },
  });
  return response.data.data;
}
