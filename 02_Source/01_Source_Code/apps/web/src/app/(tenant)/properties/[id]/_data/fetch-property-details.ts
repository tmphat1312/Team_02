import { Property } from "@/app/typings/models";
import { mockHttpClient } from "@/lib/http-client";

export async function fetchPropertyDetails(id: number): Promise<Property> {
  return mockHttpClient.get(`/properties/${id}`).then((res) => res.data);
}
