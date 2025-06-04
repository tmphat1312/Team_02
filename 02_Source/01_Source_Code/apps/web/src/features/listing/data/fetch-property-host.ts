import { User } from "@/typings/models";
import { http } from "@/lib/http";

export async function fetchPropertyHost(id: string): Promise<User> {
  return http.get(`/users/${id}`).then((res) => res.data.data);
}
