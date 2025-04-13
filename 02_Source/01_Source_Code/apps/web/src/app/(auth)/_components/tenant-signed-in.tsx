import { useUser } from "../_hooks/use-user";

export function TenantSignedIn({ children }: { children: React.ReactNode }) {
  const { isLoading, isTenant } = useUser();

  if (isLoading) {
    return null; // or a loading spinner
  }

  if (!isTenant) {
    return null;
  }

  return children;
}
