import { Category } from "@/app/typings/models";
import { httpClient } from "@/lib/http-client";

export async function fetchCategories(): Promise<Category[]> {
  const response = await httpClient.get("/categories", {
    params: {
      pageSize: 1_000,
    },
  });
  return response.data.data;
}
