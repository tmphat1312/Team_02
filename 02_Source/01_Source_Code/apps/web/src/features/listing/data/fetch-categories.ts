import { Category } from "@/typings/models";
import { httpClient } from "@/lib/http-client";

export async function fetchCategories(): Promise<Category[]> {
  const response = await httpClient.get("/categories", {
    params: {
      pageSize: 1_000,
      order: "asc",
    },
  });
  return response.data.data;
}
