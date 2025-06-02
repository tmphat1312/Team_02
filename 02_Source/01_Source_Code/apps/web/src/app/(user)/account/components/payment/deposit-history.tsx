"use client";

import React from "react";

import { useUserDepositHistory } from "@/features/payment/hooks/use-user-deposit-history";
import { formatPrice } from "@/lib/utils";

export function DepositHistory() {
  const { isLoading, data } = useUserDepositHistory();

  if (isLoading) {
    return (
      <Layout>
        <p className="text-gray-500">Loading deposit history...</p>
      </Layout>
    );
  }

  if (!data) {
    return null;
  }

  if (data.length === 0) {
    return (
      <Layout>
        <p className="text-gray-500">No deposit history available.</p>
      </Layout>
    );
  }

  return (
    <section className="max-w-md">
      <h4 className="mb-2 font-medium text-lg">Deposit History</h4>
      <ul className="divide-y-1">
        {data.map((item) => (
          <li key={item.id} className="flex justify-between mb-2 py-1">
            <span>{new Date(item.date).toLocaleString()}</span>
            <span className="text-green-600 font-semibold">
              + {formatPrice(item.amount)}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="max-w-md">
      <h4 className="mb-2 font-medium text-lg">Deposit History</h4>
      {children}
    </section>
  );
}
