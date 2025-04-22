import { Amenity } from "@/app/typings/models";

export async function fetchAmenities(): Promise<Amenity[]> {
  const response = await fetch("http://localhost:3001/amenities?pageSize=1000");
  const json = await response.json();
  return json.data;
}
