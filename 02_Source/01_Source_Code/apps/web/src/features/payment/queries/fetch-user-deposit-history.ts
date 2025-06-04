import { http } from "@/lib/http";
import { UserDepositHistory } from "@/typings/models";

export async function fetchUserDepositHistory(
  userId: string
): Promise<UserDepositHistory[]> {
  const { data } = await http.get(`/user-deposit-history/${userId}`);
  return data;
}
