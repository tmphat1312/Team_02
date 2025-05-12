import { httpClient } from "@/lib/http-client";
import { Category } from "@/typings/models";

export async function fetchCategories(): Promise<Category[]> {
  const response = await httpClient.get("/categories?pageSize=1000");
  return response.data.data;
}
