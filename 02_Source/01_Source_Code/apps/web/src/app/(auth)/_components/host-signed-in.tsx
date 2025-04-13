import { useUser } from "../_hooks/use-user";

export function HostSignedIn({ children }: { children: React.ReactNode }) {
  const { isLoading, isHost } = useUser();

  if (isLoading) {
    return null; // or a loading spinner
  }

  if (!isHost) {
    return null;
  }

  return children;
}
