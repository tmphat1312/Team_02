import { useUser } from "../_hooks/use-user";

type Props = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

export function SignedOut({ children, fallback }: Props) {
  const { isLoading, isLoggedIn } = useUser();

  if (isLoading) {
    return fallback || null;
  }

  if (isLoggedIn) {
    return null;
  }

  return children;
}
