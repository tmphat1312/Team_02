import { Category } from "@/typings/models";
import { http } from "@/lib/http";

export async function fetchPropertyCategories(id: number): Promise<Category[]> {
  return http.get(`/properties/${id}/categories`).then((res) => res.data.data);
}
