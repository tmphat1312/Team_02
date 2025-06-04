import { http } from "@/lib/http";
import { UserWallet } from "@/typings/models";

export async function fetchUserWallet(userId: string): Promise<UserWallet> {
  const { data } = await http.get(`/user-wallets/${userId}`);
  return data;
}
