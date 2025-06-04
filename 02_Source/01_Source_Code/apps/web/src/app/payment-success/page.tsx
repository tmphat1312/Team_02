"use client";

import { parseAsInteger, useQueryState } from "nuqs";
import React from "react";

import { Page } from "@/components/layout/page";
import { PageHeading } from "@/components/typography/page-heading";
import { formatVietnameseCurrency } from "@/lib/utils";

export default function PaymentSuccessPage() {
  const [amount] = useQueryState("amount", parseAsInteger.withDefault(0));
  const [countDown, setCountDown] = React.useState(5);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCountDown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.close();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Page className="grid place-content-center text-center">
      <PageHeading>Your Transaction was Successful</PageHeading>
      <p className="text-lg mb-4">
        Thank you for your payment of{" "}
        <span className="font-semibold text-green-600">
          {formatVietnameseCurrency(amount)}
        </span>
        . Your transaction has been processed successfully.
      </p>
      <p>This page will automatically close in {countDown} seconds</p>
    </Page>
  );
}
