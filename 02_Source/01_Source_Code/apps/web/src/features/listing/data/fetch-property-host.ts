import { User } from "@/app/typings/models";
import { httpClient } from "@/lib/http-client";

export async function fetchPropertyHost(id: string): Promise<User> {
  return httpClient.get(`/users/${id}`).then((res) => res.data.data);
}
