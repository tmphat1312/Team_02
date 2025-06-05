import { http } from "@/lib/http";
import { Rule } from "@/typings/models";

export async function fetchCommonRules(): Promise<Rule[]> {
  const response = await http.get("/rules?type=common&pageSize=1000&order=asc");
  return response.data.data;
}
