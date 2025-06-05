import { http } from "@/lib/http";
import { Category } from "@/typings/models";

export async function fetchCategories(): Promise<Category[]> {
  const response = await http.get("/categories?pageSize=1000&order=asc");
  return response.data.data;
}
