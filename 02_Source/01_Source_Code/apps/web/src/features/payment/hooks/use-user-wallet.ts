import { useUserContext } from "@/features/auth/contexts/UserContext";
import { useQuery } from "@tanstack/react-query";

import { fetchUserWallet } from "../queries/fetch-user-wallet";

export function useUserWallet() {
  const user = useUserContext();
  const query = useQuery({
    queryKey: ["user-wallet", user.id],
    queryFn: () => fetchUserWallet(user.id),
  });
  return query;
}
