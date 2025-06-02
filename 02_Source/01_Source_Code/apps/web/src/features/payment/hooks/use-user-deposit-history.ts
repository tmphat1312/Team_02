import { useUserContext } from "@/features/auth/contexts/UserContext";
import { useQuery } from "@tanstack/react-query";

import { fetchUserDepositHistory } from "../queries/fetch-user-deposit-history";

export function useUserDepositHistory() {
  const user = useUserContext();
  const query = useQuery({
    queryKey: ["user-deposit-history", user.id],
    queryFn: () => fetchUserDepositHistory(user.id),
  });
  return query;
}
