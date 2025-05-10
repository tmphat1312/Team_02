import { Category } from "@/app/typings/models";
import { httpClient } from "@/lib/http-client";

export async function fetchPropertyCategories(id: number): Promise<Category[]> {
  return httpClient
    .get(`/properties/${id}/categories`)
    .then((res) => res.data.data);
}
