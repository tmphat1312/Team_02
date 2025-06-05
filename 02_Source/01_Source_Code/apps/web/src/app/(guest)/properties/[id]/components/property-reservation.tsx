"use client";

import { format } from "date-fns/format";
import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
import { DateRange } from "react-day-picker";
import { toast } from "sonner";

import { Stack } from "@/components/layout/stack";
import { NumberInput } from "@/components/number-input";
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
import { Separator } from "@/components/ui/separator";
import { useUser } from "@/features/auth/hooks/use-user";
import { fetchUserWallet } from "@/features/payment/queries/fetch-user-wallet";
import { http } from "@/lib/http";
import { getQueryClient } from "@/lib/tanstack-query";
import { cn, formatPrice, makePluralNoun } from "@/lib/utils";
import { Property } from "@/typings/models";
import { useQuery } from "@tanstack/react-query";

import {
  propertyAvailabilityQueryOptions,
  usePropertyAvailability,
} from "../hooks/use-property-availability";
import { DatesPicker } from "./dates-picker";

const SERVICE_FEE = 0.25; // 25 cents
const DEPOSIT_RATE = 0.1; // 10% deposit rate

type Props = {
  item: Property;
};

export function PropertyReservation({ item }: Props) {
  const router = useRouter();
  const queryClient = getQueryClient();
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);

  const { user, isLoading } = useUser();
  const isLoggedIn = !!user;

  const { data: userWallet } = useQuery({
    queryKey: ["user-wallet", user?.id],
    queryFn: () => (user ? fetchUserWallet(user.id) : null),
    enabled: isLoggedIn,
  });

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
        return;
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
      queryClient.invalidateQueries({
        queryKey: ["user-wallet"],
      });
      setDate(undefined);
      toast.success("Reservation successful!");
      setTimeout(() => {
        closeButtonRef.current?.click();
      }, 100);
    });
  };

  const from = date?.from;
  const to = date?.to;
  const isReserveDisabled = isPending || isLoading || !from || !to;
  const numberOfNights = from && to ? calculateNumberOfDates(from, to) : 1;
  const totalPrice = calculateTotalPrice(item.pricePerNight, numberOfNights);
  const numberOfNightsInText = makePluralNoun("night", numberOfNights);
  const deposit = Number(Math.ceil(totalPrice * DEPOSIT_RATE));

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

      <Dialog>
        <DialogTrigger asChild>
          <Button
            className={cn("w-full mb-4")}
            size="lg"
            disabled={isReserveDisabled}
          >
            Reserve
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Reservation</DialogTitle>
            <DialogDescription>
              You have to pay a deposit of{" "}
              <strong>{formatPrice(deposit)}</strong> to confirm your
              reservation. This is <strong>{DEPOSIT_RATE * 100}%</strong> of the
              total price.
            </DialogDescription>
          </DialogHeader>
          <Stack orientation="vertical" className="gap-3.5 mb-8 py-4">
            {userWallet ? (
              <Stack orientation="vertical" className="gap-1">
                <TextAlert className="text-center">Your balance</TextAlert>
                <Stack className="gap-2 text-xl justify-center">
                  <span>{formatPrice(userWallet.balance)}</span>
                  <span>-</span>
                  <span className="text-green-600 font-semibold">
                    {formatPrice(deposit)}
                  </span>
                  <span>=</span>
                  <span className="text-red-600 font-semibold">
                    {formatPrice(userWallet.balance - deposit)}
                  </span>
                </Stack>
              </Stack>
            ) : (
              <TextAlert className="text-center text-base mb-6">
                You have to login to reserve this property.
              </TextAlert>
            )}
            <Stack className="justify-between">
              <span>
                {formatPrice(item.pricePerNight)} x {numberOfNightsInText}
              </span>
              <span>{formatPrice(item.pricePerNight * numberOfNights)}</span>
            </Stack>
            <Stack className="justify-between">
              <span>Rento service fee</span>
              <span>{formatPrice(SERVICE_FEE)}</span>
            </Stack>
            <Stack className="justify-between">
              <span>Deposit ({DEPOSIT_RATE * 100}%)</span>
              <span>{formatPrice(deposit)}</span>
            </Stack>
            <Separator className="my-2" />
            <Stack className="justify-between font-bold">
              <span>Total</span>
              <span>{formatPrice(totalPrice)}</span>
            </Stack>
          </Stack>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="outline"
                disabled={isPending}
                ref={closeButtonRef}
              >
                Cancel
              </Button>
            </DialogClose>
            {isLoggedIn ? (
              <Button
                variant={"secondary"}
                disabled={isReserveDisabled || userWallet!.balance < deposit}
                onClick={handleReserve}
              >
                {isPending ? "Reserving..." : "Confirm Reservation"}
              </Button>
            ) : (
              <Button
                variant={"secondary"}
                onClick={() => router.push("/sign-in")}
              >
                Login to Reserve
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <TextAlert className="text-center mb-6">
        You have to pay deposit{" "}
        <strong>
          {formatPrice(deposit)} ({DEPOSIT_RATE * 100}% total)
        </strong>{" "}
        and service fee to confirm your reservation.
      </TextAlert>

      <Stack orientation="vertical" className="gap-4">
        <Stack className="justify-between">
          <span>
            {formatPrice(item.pricePerNight)} x {numberOfNightsInText}
          </span>
          <span>{formatPrice(item.pricePerNight * numberOfNights)}</span>
        </Stack>
        <Stack className="justify-between">
          <span>Rento service fee</span>
          <span>{formatPrice(SERVICE_FEE)}</span>
        </Stack>
      </Stack>

      <Separator className="my-4" />

      <footer>
        <Stack className="justify-between font-bold">
          <span>Total</span>
          <span>{formatPrice(totalPrice)}</span>
        </Stack>
      </footer>
    </div>
  );
}

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
