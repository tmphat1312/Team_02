import { Category } from "@/app/typings/models";

export async function fetchCategories(): Promise<Category[]> {
  const response = await fetch(
    "http://localhost:3001/categories?pageSize=1000"
  );
  const json = await response.json();
  return json.data;
}
