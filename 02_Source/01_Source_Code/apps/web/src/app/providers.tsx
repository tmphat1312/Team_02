import { NuqsAdapter } from "nuqs/adapters/next/app";

import { Toaster } from "@/components/ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NuqsAdapter>{children}</NuqsAdapter>
      <Toaster richColors />
    </>
  );
}
