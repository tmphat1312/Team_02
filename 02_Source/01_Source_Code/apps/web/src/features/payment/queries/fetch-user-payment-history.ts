import { http } from "@/lib/http";
import { UserPaymentHistory } from "@/typings/models";

export async function fetchUserPaymentHistory(
  userId: string
): Promise<UserPaymentHistory[]> {
  const { data } = await http.get(`/user-payment-history/${userId}`);
  return data;
}
