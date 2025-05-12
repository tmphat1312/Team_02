import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";

const mockData = {
  wallet: {
    balance: 1_000,
    id: 1,
    userId: "asdfhasdhl",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  depositHistory: [
    {
      id: 1,
      amount: 100,
      date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      amount: 200,
      date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  paymentHistory: [
    {
      id: 1,
      amount: 50,
      date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      amount: 150,
      date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
};

export function UpdateUserWalletForm() {
  return (
    <section>
      <h3 className="mb-4 text-2xl">User Wallet</h3>
      <div className="space-y-6">
        <section className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h4 className="font-semibold text-lg">Balance: </h4>
            <p className="text-2xl">{formatPrice(mockData.wallet.balance)}</p>
          </div>
          <Button size={"lg"} variant={"ghost"} className="underline">
            Deposit
          </Button>
        </section>

        <Separator />

        <section className="max-w-md">
          <h4 className="mb-2 font-medium text-lg">Deposit History</h4>
          <ul>
            {mockData.depositHistory.map((item) => (
              <li key={item.id} className="flex justify-between">
                <span>{item.date.toLocaleDateString()}</span>
                <span>{formatPrice(item.amount)}</span>
              </li>
            ))}
          </ul>
        </section>

        <Separator />

        <section className="max-w-md">
          <h4 className="mb-2 font-medium text-lg">Payment History</h4>
          <ul>
            {mockData.paymentHistory.map((item) => (
              <li key={item.id} className="flex justify-between">
                <span>{item.date.toLocaleDateString()}</span>
                <span>{formatPrice(item.amount)}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
}
