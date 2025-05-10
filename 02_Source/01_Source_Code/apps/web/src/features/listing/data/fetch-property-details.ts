import { Property } from "@/app/typings/models";
import { httpClient } from "@/lib/http-client";

export async function fetchPropertyDetails(id: number): Promise<Property> {
  return httpClient.get(`/properties/${id}`).then((res) => res.data.data);
}
