import { useUser } from "../_hooks/use-user";

type Props = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

export function HostSignedIn({ children, fallback }: Props) {
  const { isLoading, isHost } = useUser();

  if (isLoading) {
    return fallback || null;
  }

  if (!isHost) {
    return null;
  }

  return children;
}
