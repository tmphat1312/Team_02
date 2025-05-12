import { User } from "@/typings/models";
import { httpClient } from "@/lib/http-client";

export async function fetchUserDetails(userId: string): Promise<User> {
  return httpClient.get(`/users/${userId}`).then((res) => res.data.data);
}
