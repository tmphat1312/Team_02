import { Property } from "@/typings/models";
import { http } from "@/lib/http";

export async function fetchPropertyDetails(id: number): Promise<Property> {
  return http.get(`/properties/${id}`).then((res) => res.data.data);
}
