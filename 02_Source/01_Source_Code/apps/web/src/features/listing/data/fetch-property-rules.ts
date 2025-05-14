import { Rule } from "@/typings/models";
import { http } from "@/lib/http";

export async function fetchPropertyRules(id: number): Promise<Rule[]> {
  return http.get(`/properties/${id}/rules`).then((res) => res.data.data);
}
