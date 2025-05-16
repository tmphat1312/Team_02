import { User } from "@/typings/models";
import { http } from "@/lib/http";

export async function fetchUserDetails(userId: string): Promise<User> {
  return http.get(`/users/${userId}`).then((res) => res.data.data);
}
