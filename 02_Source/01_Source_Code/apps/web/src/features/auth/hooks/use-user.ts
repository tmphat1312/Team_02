import { auth } from "@/lib/auth";

export function useUser() {
  const { data, isPending, error } = auth.useSession();

  const user = data?.user;
  const isLoggedIn = !!user;
  const isLoading = isPending;
  const isError = !!error;
  const isAdmin = user?.role === "admin";
  const isHost = user?.role === "host";
  const isTenant = user?.role === "tenant";

  return {
    user,
    isLoggedIn,
    isLoading,
    isError,
    isAdmin,
    isHost,
    isTenant,
  };
}
