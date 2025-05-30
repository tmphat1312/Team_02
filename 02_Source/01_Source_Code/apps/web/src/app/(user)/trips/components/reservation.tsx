"use client";

import { format } from "date-fns";
import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { useCancelReservation } from "@/app/(user)/trips/hooks/use-cancel-reservation";
import { usePayReservation } from "@/app/(user)/trips/hooks/use-pay-reservation";
import { DefaultUserAvatar } from "@/components/icons/default-user-avatar";
import { Grid } from "@/components/layout/grid";
import { Stack } from "@/components/layout/stack";
import { TextAlert } from "@/components/typography/text-alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
import { useUserWallet } from "@/features/payment/hooks/use-user-wallet";
import { cn, formatPrice, makePluralNoun } from "@/lib/utils";
import { Trip } from "@/typings/models";
import { ReviewDialog } from "./review-dialog";

type Props = {
  item: Trip;
};

export function Reservation({ item }: Props) {
  return (
    <Card
      className={cn(
        "p-0 overflow-clip block @container border-e-8 border-b-4",
        item.status === "Pending" && "border-border",
        item.status === "Confirmed" && "border-secondary/70",
        item.status === "Paid" && "border-green-600/50",
        item.status === "Canceled" && "border-destructive/20",
        item.status === "Refunded" && "border-destructive/20"
      )}
    >
      <div className="flex">
        <Image
          src={item.property.imageUrls[0]}
          alt={item.property.title}
          width={240}
          height={240}
          className="object-cover size-60"
        />

        <div className="p-4 grow space-y-4">
          <Stack className="items-start justify-between gap-1">
            <section>
              <Link
                href={`/properties/${item.propertyId}`}
                className="hover:underline"
              >
                <h2 className="text-xl font-semibold text-pretty">
                  {item.property.title}
                </h2>
              </Link>
              <p className="text-muted-foreground flex items-center mt-1 gap-1">
                <MapPin className="size-4" />
                {item.property.address}
              </p>
            </section>
            <Avatar className="size-10">
              <AvatarImage
                src={item.property.host.image || ""}
                alt={item.property.host.name}
              />
              <AvatarFallback>
                <DefaultUserAvatar className="text-gray-600/50" />
              </AvatarFallback>
            </Avatar>
          </Stack>

          <Grid className="grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Check-in</p>
              <p className="font-medium flex items-center gap-1">
                <Calendar className="size-4" />
                {format(item.checkInDate, "MMM d, yyyy")}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Check-out</p>
              <p className="font-medium flex items-center gap-1">
                <Calendar className="size-4" />
                {format(item.checkOutDate, "MMM d, yyyy")}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Guests</p>
              <p className="font-medium">
                {makePluralNoun("guest", item.numberOfGuests)}
              </p>
            </div>
          </Grid>
        </div>
      </div>

      <Separator />

      <Stack className="p-4 justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Total</p>
          <p className="font-semibold">{formatPrice(item.totalPrice)}</p>
        </div>

        {item.status === "Pending" && <PendingActions trip={item} />}
        {item.status === "Confirmed" && <ConfirmedActions trip={item} />}
        {item.status === "Paid" && <PaidActions trip={item} />}
        {item.status === "Canceled" && (
          <span className="text-destructive bg-destructive/10 py-2 px-4 shadow font-medium text-sm">
            Trip cancelled
          </span>
        )}
        {item.status === "Refunded" && (
          <span className="text-destructive bg-destructive/10 py-2 px-4 shadow font-medium text-sm">
            Trip cancelled & refunded
          </span>
        )}
      </Stack>
    </Card>
  );
}

function PendingActions({ trip }: { trip: Trip }) {
  return (
    <Stack className="gap-3">
      <span className="text-muted-foreground bg-muted py-2 px-4 font-medium text-sm">
        Waiting for confirmation
      </span>
      <CancelButton trip={trip} />
    </Stack>
  );
}

function ConfirmedActions({ trip }: { trip: Trip }) {
  const { mutate: pay, isPending: isPaying } = usePayReservation(trip.id);
  const { isLoading: isLoadingWallet, data } = useUserWallet();

  const userWallet = data || {
    balance: 0,
    id: "",
    userId: "",
  };
  const deposit = Math.ceil(trip.totalPrice * 0.1);
  const remaining = trip.totalPrice - deposit;

  return (
    <Stack className="gap-3">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary">Pay now</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Make Full Payment</DialogTitle>
            <DialogDescription>
              Send host the remaining of{" "}
              <strong>{formatPrice(remaining)}</strong> for your reservation. A
              deposit of <strong>{formatPrice(deposit)}</strong> has already
              been paid.
            </DialogDescription>
          </DialogHeader>
          <Stack orientation="vertical" className="gap-3.5 py-4">
            <Stack orientation="vertical" className="gap-1">
              <TextAlert className="text-center">Your balance</TextAlert>
              <Stack className="gap-2 text-xl justify-center">
                <span>{formatPrice(userWallet.balance)}</span>
                <span>-</span>
                <span className="text-green-600 font-semibold">
                  {formatPrice(remaining)}
                </span>
                <span>=</span>
                <span className="text-red-600 font-semibold">
                  {formatPrice(userWallet.balance - remaining)}
                </span>
              </Stack>
            </Stack>
            <Stack orientation="vertical" className="gap-1">
              <TextAlert>Remaining:</TextAlert>
              <Stack className="justify-between">
                <span>
                  {formatPrice(trip.totalPrice)} - {formatPrice(deposit)}{" "}
                  (Deposit)
                </span>
                <span>= {formatPrice(remaining)}</span>
              </Stack>
            </Stack>
          </Stack>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              variant={"secondary"}
              onClick={() => {
                pay();
              }}
              disabled={
                isPaying || isLoadingWallet || userWallet.balance < remaining
              }
            >
              Pay
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <CancelButton trip={trip} />
    </Stack>
  );
}

function PaidActions({ trip }: { trip: Trip }) {
  const isCompleted = new Date(trip.checkInDate) < new Date();
  const isReviewed = trip.review !== null;

  if (isReviewed) {
    return (
      <span className="text-muted-foreground bg-muted py-2 px-4 shadow font-medium text-sm">
        Review left
      </span>
    );
  }

  if (isCompleted) {
    return <ReviewDialog trip={trip} />;
  }

  return (
    <Stack className="gap-3">
      <span className="text-green-600 bg-green-600/10 py-2 px-4 shadow font-medium text-sm">
        Trip paid
      </span>
      <CancelButton trip={trip} />
    </Stack>
  );
}

function CancelButton({ trip }: { trip: Trip }) {
  const { mutate: cancel, isPending: isCancelling } = useCancelReservation(
    trip.id
  );

  return (
    <Button
      variant="destructive"
      onClick={() => cancel()}
      disabled={isCancelling}
    >
      Cancel
    </Button>
  );
}
