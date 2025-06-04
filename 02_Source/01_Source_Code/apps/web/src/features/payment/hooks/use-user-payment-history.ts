import { useUserContext } from "@/features/auth/contexts/UserContext";
import { useQuery } from "@tanstack/react-query";

import { fetchUserPaymentHistory } from "../queries/fetch-user-payment-history";

export function useUserPaymentHistory() {
  const user = useUserContext();
  const query = useQuery({
    queryKey: ["user-payment-history", user.id],
    queryFn: () => fetchUserPaymentHistory(user.id),
  });
  return query;
}
