import { Stack } from "@/components/layout/stack";
import { Separator } from "@/components/ui/separator";
import { DepositHistory } from "./deposit-history";
import { PaymentHistory } from "./payment-history";
import { UserWallet } from "./user-wallet";

export function UserPayment() {
  return (
    <section>
      <h3 className="mb-4 text-2xl">User Wallet</h3>
      <Stack orientation="vertical" className="gap-6">
        <UserWallet />
        <Separator />
        <DepositHistory />
        <Separator />
        <PaymentHistory />
      </Stack>
    </section>
  );
}
