"use client";

import { format } from "date-fns/format";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { DateRange } from "react-day-picker";
import { toast } from "sonner";

import { Stack } from "@/components/layout/stack";
import { NumberInput } from "@/components/number-input";
import { TextAlert } from "@/components/typography/text-alert";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@/features/auth/hooks/use-user";
import { http } from "@/lib/http";
import { formatPrice, makePluralNoun } from "@/lib/utils";
import { Property } from "@/typings/models";

import { DatesPicker } from "./dates-picker";
import { getQueryClient } from "@/lib/tanstack-query";
import {
  propertyAvailabilityQueryOptions,
  usePropertyAvailability,
} from "../hooks/use-property-availability";

const ServiceFee = 20;

type Props = {
  item: Property;
};

export function PropertyReservation({ item }: Props) {
  const router = useRouter();
  const queryClient = getQueryClient();

  const { user, isLoading } = useUser();
  const isLoggedIn = !!user;

  const { data: reservedDates } = usePropertyAvailability(item.id);
  const myReservedDates =
    reservedDates && isLoggedIn
      ? reservedDates.filter(
          (d) => d.tenantId === user.id && new Date(d.startDate) > new Date()
        )
      : [];

  const [noGuests, setNoGuests] = useState(1);
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const [isPending, startTransition] = useTransition();

  const handleNoGuestsChange = (value: number) => {
    setNoGuests(value);
  };

  const handleReserve = () => {
    startTransition(async () => {
      if (!isLoggedIn) {
        return router.push("/sign-in");
      }

      const payload = {
        tenantId: user.id,
        hostId: item.hostId,
        propertyId: item.id,
        totalPrice,
        checkInDate: from,
        checkOutDate: to,
        numberOfGuests: noGuests,
      };

      await http.post("/reservations", payload);
      queryClient.invalidateQueries(propertyAvailabilityQueryOptions(item.id));
      setDate(undefined);
      toast.success("Reservation successful!");
    });
  };

  const from = date?.from;
  const to = date?.to;
  const isReserveDisabled = isPending || isLoading || !from || !to;
  const numberOfNights = from && to ? calculateNumberOfDates(from, to) : 1;
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
        <DatesPicker
          item={item}
          date={date}
          setDate={setDate}
          disabled={isPending}
        >
          <div className="p-3 border-r border-b">
            <div className="text-xs text-muted-foreground font-medium">
              CHECK-IN
            </div>
            <div>{from ? format(from, "dd/MM/y") : "Pick a date"}</div>
          </div>
          <div className="p-3 border-b">
            <div className="text-xs text-muted-foreground font-medium">
              CHECKOUT
            </div>
            <div>{to ? format(to, "dd/MM/y") : "Pick a date"}</div>
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

      {myReservedDates.length > 0 && (
        <Stack orientation="vertical" className="mb-4 ps-2">
          {myReservedDates.map((date) => (
            <TextAlert key={date.reservationId}>
              Reserved from&nbsp;
              <strong>{format(date.startDate, "dd/MM/y")}</strong> to
              <strong> {format(date.endDate, "dd/MM/y")}</strong>
            </TextAlert>
          ))}
        </Stack>
      )}

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
          <span>{formatPrice(ServiceFee)}</span>
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

const calculateTotalPrice = (pricePerNight: number, numberOfNights: number) => {
  const totalPrice = pricePerNight * numberOfNights + ServiceFee;
  return totalPrice;
};

const calculateNumberOfDates = (start: Date, end: Date) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const timeDiff = endDate.getTime() - startDate.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
};
