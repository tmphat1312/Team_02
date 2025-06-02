"use client";

import React from "react";

import { Stack } from "@/components/layout/stack";
import { TextAlert } from "@/components/typography/text-alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { env } from "@/env";
import { useUserContext } from "@/features/auth/contexts/UserContext";
import { cn, formatVietnameseCurrency } from "@/lib/utils";

const DEFAULT_AMOUNT = 100_000; // 100,000 VND
const MIN_AMOUNT = 10_000; // 10,000 VND
const MAX_AMOUNT = 10_000_000; // 1,000,000 VND

const COMMON_AMOUNT_VALUES = [
  50_000, // 50,000 VND
  100_000, // 100,000 VND
  200_000, // 200,000 VND
  500_000, // 500,000 VND
  1_000_000, // 1,000,000 VND
  2_000_000, // 2,000,000 VND
  5_000_000, // 5,000,000 VND
];

const constructPaymentUrl = ({
  amount,
  userId,
}: {
  amount: number;
  userId: string;
}) => {
  const base = env.NEXT_PUBLIC_PAYMENT_URL;
  const params = new URLSearchParams({
    amount: amount.toString(),
    userId: userId,
  });
  return `${base}?${params.toString()}`;
};

export function DepositButton() {
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);
  const { id: userId } = useUserContext();
  const [amount, setAmount] = React.useState(DEFAULT_AMOUNT);
  const [error, setError] = React.useState("");

  const amountInVND = formatVietnameseCurrency(amount);
  const canProceed = amount >= MIN_AMOUNT && amount <= MAX_AMOUNT;
  const paymentUrl = constructPaymentUrl({
    amount,
    userId: userId,
  });

  const handleProceed = () => {
    if (!canProceed) {
      return;
    }
    window.open(paymentUrl, "_blank");
    closeButtonRef.current?.click(); // Close the dialog after proceeding
    setError(""); // Clear any previous error
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (isNaN(value)) {
      setError("Please enter a valid number");
      setAmount(DEFAULT_AMOUNT);
    } else if (value < MIN_AMOUNT || value > MAX_AMOUNT) {
      setError(
        `Amount must be between ${formatVietnameseCurrency(
          MIN_AMOUNT
        )} and ${formatVietnameseCurrency(MAX_AMOUNT)}`
      );
      setAmount(value);
    } else {
      setError("");
      setAmount(value);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"lg"} variant={"ghost"} className="underline">
          Deposit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deposit Funds</DialogTitle>
          <DialogDescription>
            The deposit amount will be exchanged to USD after the payment is
            completed. Please ensure the amount is sufficient to cover any
            transaction fees.
          </DialogDescription>
        </DialogHeader>
        <Stack orientation="vertical" className="gap-3">
          <label className="flex mx-auto w-fit relative text-xl">
            <div className="absolute inset-y-0 inset-x-0 py-3 px-4 bg-transparent overflow-clip">
              {amountInVND}
            </div>
            <input
              type="number"
              value={amount}
              onChange={handleAmountChange}
              className={cn(
                "border rounded py-3 px-4 caret-foreground text-transparent z-10 w-[18ch]",
                amount < 1_000 && "ps-4.5",
                amount >= 1_000 && amount < 1_000_000 && "ps-5",
                amount >= 1_000_000 && "ps-6.5"
              )}
              step={10_000}
              min={MIN_AMOUNT}
              max={MAX_AMOUNT}
            />
          </label>
          {error && (
            <TextAlert className="text-red-500 text-xs mx-auto">
              {error}
            </TextAlert>
          )}
          <TextAlert>Minimum: {formatVietnameseCurrency(MIN_AMOUNT)}</TextAlert>
          <TextAlert>Maximum: {formatVietnameseCurrency(MAX_AMOUNT)}</TextAlert>
          <Stack orientation="vertical" className="gap-2">
            <TextAlert>Common amounts:</TextAlert>
            <Stack orientation="horizontal" className="flex-wrap gap-2">
              {COMMON_AMOUNT_VALUES.map((value) => (
                <Button
                  key={value}
                  variant="outline"
                  size="sm"
                  onClick={() => setAmount(value)}
                  disabled={amount === value}
                >
                  {formatVietnameseCurrency(value)}
                </Button>
              ))}
            </Stack>
          </Stack>
        </Stack>
        <DialogFooter>
          <DialogClose asChild ref={closeButtonRef}>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>
          <Button
            variant={"secondary"}
            disabled={!canProceed}
            onClick={handleProceed}
          >
            Proceed via VNPay
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
