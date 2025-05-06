import { Property } from "@/app/typings/models";
import { mockHttpClient } from "@/lib/http-client";
import { delay } from "@/lib/utils";

export async function fetchPropertyDetails(id: number): Promise<Property> {
  await delay(2_000);
  return mockHttpClient.get(`/properties/${id}`).then((res) => res.data);
}
