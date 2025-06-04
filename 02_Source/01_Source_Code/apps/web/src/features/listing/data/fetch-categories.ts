import { Category } from "@/typings/models";
import { http } from "@/lib/http";

export async function fetchCategories(): Promise<Category[]> {
  const response = await http.get("/categories", {
    params: {
      pageSize: 1_000,
      order: "asc",
    },
  });
  return response.data.data;
}
