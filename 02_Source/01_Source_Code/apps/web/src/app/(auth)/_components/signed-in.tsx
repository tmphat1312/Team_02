import { useUser } from "../_hooks/use-user";

export function SignedIn({ children }: { children: React.ReactNode }) {
  const { isLoading, isLoggedIn } = useUser();

  if (isLoading) {
    return null; // or a loading spinner
  }

  if (!isLoggedIn) {
    return null;
  }

  return children;
}
