"use client";

import { addDays } from "date-fns/addDays";
import { format } from "date-fns/format";
import pluralize from "pluralize";
import { useState, useTransition } from "react";
import { DateRange } from "react-day-picker";

import { Property } from "@/app/typings/models";

import { delay, formatPrice } from "@/lib/utils";

import { NumberInput } from "@/components/number-input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DatesPicker } from "./dates-picker";
import { toast } from "sonner";

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
  from: new Date(),
  to: addDays(new Date(), 5),
};

const SERVICE_FEE = 20;

export function PropertyReservation({ item }: PropertyReservationProps) {
  const [noGuests, setNoGuests] = useState(1);
  const [date, setDate] = useState<DateRange | undefined>(INITIAL_DATE);
  const [isPending, startTransition] = useTransition();
  const numberOfNights = calculateNumberOfDates(
    date?.from || INITIAL_DATE.from,
    date?.to || INITIAL_DATE.to
  );
  const numberOfNightsInText = pluralize("night", numberOfNights, true);
  const totalPrice = calculateTotalPrice(item.pricePerNight, numberOfNights);

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

  const isReserveDisabled = isPending || !date?.from || !date?.to;

  return (
    <div className="border rounded-xl p-6 shadow-lg">
      <div className="mb-4">
        <span className="text-2xl font-bold">{formatPrice(totalPrice)}</span>
        <span> for {pluralize("night", numberOfNights, true)}</span>
      </div>

      <div className="border rounded-lg overflow-hidden mb-4">
        <DatesPicker date={date} setDate={setDate} disabled={isPending}>
          <div className="p-3 border-r">
            <div className="text-xs font-semibold">CHECK-IN</div>
            <div>
              {date && date.from ? format(date.from!, "dd/MM/y") : "N/A"}
            </div>
          </div>
          <div className="p-3">
            <div className="text-xs font-semibold">CHECKOUT</div>
            <div>{date && date.to ? format(date.to!, "dd/MM/y") : "N/A"}</div>
          </div>
        </DatesPicker>
        <Separator />
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
        className="w-full mb-4 bg-airbnb hover:bg-airbnb-hover text-white"
        size="lg"
        onClick={handleReserve}
        disabled={isReserveDisabled}
      >
        {isPending ? "Reserving..." : "Reserve"}
      </Button>

      <p className="text-center text-sm text-muted-foreground mb-6">
        You won&apos;t be charged yet
      </p>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span>
            {formatPrice(item.pricePerNight)} x {numberOfNightsInText}
          </span>
          <span>{formatPrice(item.pricePerNight * numberOfNights)}</span>
        </div>
        <div className="flex justify-between">
          <span>Airbnb service fee</span>
          <span>{formatPrice(SERVICE_FEE)}</span>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="flex justify-between font-bold">
        <span>Total before taxes</span>
        <span>{formatPrice(totalPrice)}</span>
      </div>
    </div>
  );
}
