"use client";

import { Stack } from "@/components/layout/stack";
import { useUserContext } from "@/features/auth/contexts/UserContext";
import { useUserPaymentHistory } from "@/features/payment/hooks/use-user-payment-history";
import { cn, formatPrice } from "@/lib/utils";

export function PaymentHistory() {
  const { isLoading, data } = useUserPaymentHistory();
  const user = useUserContext();

  if (isLoading) {
    return (
      <Layout>
        <p className="text-gray-500">Loading payment history...</p>
      </Layout>
    );
  }

  if (!data) {
    return null;
  }

  if (data.length === 0) {
    return (
      <Layout>
        <p className="text-gray-500">No payment history available.</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <ul className="divide-y">
        {data.map((item) => (
          <li key={item.id} className="py-1">
            <Stack className="justify-between">
              <span>{new Date(item.date).toLocaleString()}</span>
              <span
                className={cn(
                  item.toUserId == user.id ? "text-green-500" : "text-red-500",
                  "font-semibold"
                )}
              >
                {item.toUserId == user.id ? "+" : "-"}{" "}
                {formatPrice(item.amount)}
                {item.status == "DEPOSIT-PAID" && " (Deposit)"}
                {item.status == "FULL-PAID" && " (Full Payment)"}
                {item.status == "REFUNDED" && " (Refunded)"}
              </span>
            </Stack>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="max-w-md">
      <h4 className="mb-2 font-medium text-lg">Payment History</h4>
      {children}
    </section>
  );
}
