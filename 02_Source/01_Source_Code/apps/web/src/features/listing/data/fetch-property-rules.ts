import { Rule } from "@/app/typings/models";
import { httpClient } from "@/lib/http-client";

export async function fetchPropertyRules(id: number): Promise<Rule[]> {
  return httpClient.get(`/properties/${id}/rules`).then((res) => res.data.data);
}
