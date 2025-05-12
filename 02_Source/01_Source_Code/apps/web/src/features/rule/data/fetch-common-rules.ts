import { httpClient } from "@/lib/http-client";
import { Rule } from "@/typings/models";

export async function fetchCommonRules(): Promise<Rule[]> {
  const response = await httpClient.get("/rules?type=common&pageSize=1000");
  return response.data.data;
}
