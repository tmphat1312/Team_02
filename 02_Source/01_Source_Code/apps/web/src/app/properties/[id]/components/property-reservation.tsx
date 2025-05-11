"use client";

import { addDays } from "date-fns/addDays";
import { format } from "date-fns/format";
import { useState, useTransition } from "react";
import { DateRange } from "react-day-picker";
import { toast } from "sonner";

import { Property } from "@/app/typings/models";
import { Stack } from "@/components/layout/stack";
import { NumberInput } from "@/components/number-input";
import { TextAlert } from "@/components/typography/text-alert";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { delay, formatPrice, makePluralNoun } from "@/lib/utils";

import { DatesPicker } from "./dates-picker";

type PropertyReservationProps = {
  item: Property;
};

const calculateTotalPrice = (pricePerNight: number, numberOfNights: number) => {
  const totalPrice = pricePerNight * numberOfNights + SERVICE_FEE;
  return totalPrice;
};

const calculateNumberOfDates = (start: Date, end: Date) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const timeDiff = endDate.getTime() - startDate.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
};

const INITIAL_DATE = {
  from: addDays(new Date(), 1),
  to: addDays(new Date(), 6),
};

const SERVICE_FEE = 20;

export function PropertyReservation({ item }: PropertyReservationProps) {
  const [noGuests, setNoGuests] = useState(1);
  const [date, setDate] = useState<DateRange | undefined>(INITIAL_DATE);
  const [isPending, startTransition] = useTransition();
  const from = date?.from || INITIAL_DATE.from;
  const to = date?.to || INITIAL_DATE.to;

  const handleNoGuestsChange = (value: number) => {
    setNoGuests(value);
  };

  const handleReserve = () => {
    startTransition(async () => {
      await delay(2000);
      console.log("Reserve clicked");
      console.log("Selected dates:", date);
      console.log("Number of guests:", noGuests);
      console.log("Total price:", totalPrice);
      toast.success("Reservation successful!");
    });
  };

  const isReserveDisabled = isPending || !from || !to;
  const numberOfNights = calculateNumberOfDates(from, to);
  const totalPrice = calculateTotalPrice(item.pricePerNight, numberOfNights);
  const numberOfNightsInText = makePluralNoun("night", numberOfNights);

  return (
    <div className="border rounded-xl p-6 shadow-lg w-full max-w-sm mx-auto">
      <header className="mb-4">
        <span className="text-2xl font-bold me-0.5 inline-block">
          {formatPrice(totalPrice)}
        </span>
        <span> for {makePluralNoun("night", numberOfNights)}</span>
      </header>

      <div className="border rounded-lg overflow-hidden mb-4 shadow">
        <DatesPicker date={date} setDate={setDate} disabled={isPending}>
          <div className="p-3 border-r border-b">
            <div className="text-xs text-muted-foreground font-medium">
              CHECK-IN
            </div>
            <div>{format(from, "dd/MM/y")}</div>
          </div>
          <div className="p-3 border-b">
            <div className="text-xs text-muted-foreground font-medium">
              CHECKOUT
            </div>
            <div>{format(to, "dd/MM/y")}</div>
          </div>
        </DatesPicker>
        <div className="p-5">
          <NumberInput
            disabled={isPending}
            value={noGuests}
            onValueChange={handleNoGuestsChange}
            label="GUESTS"
            maxValue={item.numberOfGuests}
            minValue={1}
          />
        </div>
      </div>

      <Button
        className="w-full mb-4"
        size="lg"
        onClick={handleReserve}
        disabled={isReserveDisabled}
      >
        {isPending ? "Reserving..." : "Reserve"}
      </Button>

      <TextAlert className="text-center mb-6">
        You won&apos;t be charged yet
      </TextAlert>

      <Stack orientation="vertical" className="gap-4">
        <Stack className="justify-between">
          <span>
            {formatPrice(item.pricePerNight)} x {numberOfNightsInText}
          </span>
          <span>{formatPrice(item.pricePerNight * numberOfNights)}</span>
        </Stack>
        <Stack className="justify-between">
          <span>Airbnb service fee</span>
          <span>{formatPrice(SERVICE_FEE)}</span>
        </Stack>
      </Stack>

      <Separator className="my-4" />

      <footer className="flex justify-between font-bold">
        <span>Total</span>
        <span>{formatPrice(totalPrice)}</span>
      </footer>
    </div>
  );
}
