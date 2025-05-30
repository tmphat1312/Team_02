"use client";

import { format } from "date-fns";
import { parseAsStringEnum, useQueryState } from "nuqs";

import { Stack } from "@/components/layout/stack";
import { TextAlert } from "@/components/typography/text-alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/features/auth/contexts/UserContext";
import { cn, formatPrice, makePluralNoun } from "@/lib/utils";
import { ManagedReservation } from "@/typings/models";

import { useConfirmReservation } from "../hooks/use-confirm-reservation";
import { useHostReservations } from "../hooks/use-host-reservations";
import { useRefundReservation } from "../hooks/use-refund-reservation";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useUserWallet } from "@/features/payment/hooks/use-user-wallet";

export function Reservations() {
  const host = useUserContext();
  const { data: reservations } = useHostReservations(host.id);
  const [activeTab] = useQueryState(
    "tab",
    parseAsStringEnum([
      "all",
      "new",
      "upcoming",
      "completed",
      "cancelled",
    ]).withDefault("all")
  );

  const isLoading = !reservations;

  if (isLoading) {
    return <TextAlert>Loading...</TextAlert>;
  }

  const filtered = reservations.filter((reservation) => {
    if (activeTab === "all") return true;
    if (activeTab === "new") return reservation.status === "Pending";
    if (activeTab === "upcoming") {
      const today = new Date();
      return (
        reservation.status === "Confirmed" &&
        new Date(reservation.checkInDate) > today
      );
    }
    if (activeTab === "completed") {
      const today = new Date();
      return (
        reservation.status === "Paid" &&
        new Date(reservation.checkOutDate) <= today
      );
    }
    if (activeTab === "cancelled") {
      return (
        reservation.status === "Canceled" || reservation.status === "Refunded"
      );
    }
    return false;
  });

  const isEmpty = filtered.length === 0;

  if (isEmpty) {
    return <TextAlert>There are no reservations yet.</TextAlert>;
  }

  return (
    <ul className="grid grid-cols-2 gap-5">
      {filtered.map((reservation) => (
        <li key={reservation.id}>
          <ReservationCard item={reservation} />
        </li>
      ))}
    </ul>
  );
}

function ReservationCard({ item }: { item: ManagedReservation }) {
  const { mutate: confirm, isPending: isConfirming } = useConfirmReservation(
    item.id
  );
  const { mutate: refund, isPending: isRefunding } = useRefundReservation(
    item.id
  );
  const { data } = useUserWallet();
  const userWallet = data || {
    balance: 0,
    id: "",
    userId: "",
  };
  const refundingAmount = Math.ceil(item.totalPrice * 0.1);
  return (
    <article
      className={cn(
        "border-2 border-e-8 border-b-4 rounded-lg p-6 relative space-y-4",
        item.status === "Pending" && "border-border",
        item.status === "Confirmed" && "border-secondary/70",
        item.status === "Paid" && "border-green-600/50",
        (item.status === "Canceled" || item.status === "Refunded") &&
          "border-destructive/50"
      )}
    >
      <Stack className="gap-6">
        <Avatar className="size-12">
          <AvatarImage src={item.tenant.image || ""} alt={item.tenant.name} />
          <AvatarFallback>{item.tenant.name.at(0)}</AvatarFallback>
        </Avatar>
        <section>
          <h3 className="text-lg font-semibold">{item.tenant.name}</h3>
          <p className="text-sm text-muted-foreground">{item.property.title}</p>
        </section>
        <Stack orientation="vertical" className="ms-auto">
          <span className="text-sm font-medium">Total</span>
          <time className="text-sm">{formatPrice(item.totalPrice)}</time>
        </Stack>
      </Stack>
      <Stack className="gap-8">
        <Stack orientation="vertical" className="ms-18">
          <span className="text-sm font-medium">Check-in</span>
          <time className="text-sm">
            {format(item.checkInDate, "MMM d, yyyy")}
          </time>
        </Stack>
        <Stack orientation="vertical">
          <span className="text-sm font-medium">Check-out</span>
          <time className="text-sm">
            {format(item.checkOutDate, "MMM d, yyyy")}
          </time>
        </Stack>
        <Stack orientation="vertical">
          <span className="text-sm font-medium">Guests</span>
          <time className="text-sm">
            {makePluralNoun("guest", item.numberOfGuests)}
          </time>
        </Stack>

        <div className="ms-auto">
          {item.status === "Pending" && (
            <Button
              variant={"secondary"}
              disabled={isConfirming}
              onClick={() => confirm()}
            >
              Confirm
            </Button>
          )}
          {item.status === "Confirmed" && (
            <span className="text-sm inline-flex items-center bg-secondary/70 text-white p-2">
              Confirmed
            </span>
          )}
          {item.status === "Paid" && (
            <span className="text-sm inline-flex items-center bg-green-600/70 text-white p-2">
              Full paid
            </span>
          )}
          {item.status === "Canceled" && (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive">Refund</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Make Full Payment</DialogTitle>
                  <DialogDescription>
                    You will refund the deposit of the trip. The amount will be
                    deducted from your wallet balance. Please ensure you have
                    enough balance to cover the refund.
                  </DialogDescription>
                </DialogHeader>
                <Stack orientation="vertical" className="gap-3.5 py-4">
                  <Stack orientation="vertical" className="gap-1">
                    <TextAlert className="text-center">Your balance</TextAlert>
                    <Stack className="gap-2 text-xl justify-center">
                      <span>{formatPrice(userWallet.balance)}</span>
                      <span>-</span>
                      <span className="text-green-600 font-semibold">
                        {formatPrice(refundingAmount)}
                      </span>
                      <span>=</span>
                      <span className="text-red-600 font-semibold">
                        {formatPrice(userWallet.balance - refundingAmount)}
                      </span>
                    </Stack>
                  </Stack>
                  <Stack orientation="vertical" className="gap-1">
                    <TextAlert>Refunding Amount (Deposit):</TextAlert>
                    <Stack className="justify-between">
                      <span>10% of {formatPrice(item.totalPrice)}</span>
                      <span>= {formatPrice(refundingAmount)}</span>
                    </Stack>
                  </Stack>
                </Stack>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button
                    variant={"destructive"}
                    onClick={() => {
                      refund();
                    }}
                    disabled={
                      isRefunding || userWallet.balance < refundingAmount
                    }
                  >
                    Refund
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
          {item.status === "Refunded" && (
            <span className="text-sm inline-flex items-center bg-destructive/70 text-white p-2">
              Canceled & refunded
            </span>
          )}
        </div>
      </Stack>
    </article>
  );
}
