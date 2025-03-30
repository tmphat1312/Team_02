import { NuqsAdapter } from 'nuqs/adapters/react';
import { HeroUIProvider, ToastProvider } from '@heroui/react';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NuqsAdapter>
      <HeroUIProvider>
        <ToastProvider placement="top-center" />
        {children}
      </HeroUIProvider>
    </NuqsAdapter>
  );
}
