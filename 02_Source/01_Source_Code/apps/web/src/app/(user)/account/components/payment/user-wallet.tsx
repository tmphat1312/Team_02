"use client";

import { Stack } from "@/components/layout/stack";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserWallet } from "@/features/payment/hooks/use-user-wallet";
import { formatPrice } from "@/lib/utils";
import { DepositButton } from "./deposit-button";

export function UserWallet() {
  const { isLoading, data } = useUserWallet();

  if (isLoading) {
    return (
      <Stack className="justify-between">
        <Skeleton className="h-10 w-30" />
        <Skeleton className="h-10 w-20" />
      </Stack>
    );
  }

  if (!data) return null;

  return (
    <section>
      <Stack className="justify-between">
        <Stack className="gap-4">
          <h4 className="font-semibold text-lg">Balance: </h4>
          <p className="text-2xl">{formatPrice(data.balance)}</p>
        </Stack>
        <DepositButton />
      </Stack>
    </section>
  );
}
