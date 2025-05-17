import { format } from "date-fns";
import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Grid } from "@/components/layout/grid";
import { Stack } from "@/components/layout/stack";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn, formatPrice, makePluralNoun } from "@/lib/utils";
import { Trip } from "@/typings/models";

type Props = {
  item: Trip;
};

export function Reservation({ item }: Props) {
  return (
    <Card
      className={cn(
        "p-0 overflow-clip block @container border-e-8 border-b-4",
        item.status === "Cancelled" && "border-destructive/20",
        item.status === "Paid" && "border-green-600",
        item.status === "Confirmed" && "border-secondary",
        item.status === "Pending" && "border-muted"
      )}
    >
      <div className="@lg:flex">
        <Image
          src={item.property.imageUrls[0]}
          alt={item.property.title}
          width={240}
          height={240}
          className="object-cover w-full max-h-60 @lg:size-60"
        />

        <div className="p-4 grow space-y-4">
          <Stack className="items-start justify-between">
            <section>
              <Link
                href={`/properties/${item.propertyId}`}
                className="hover:underline"
              >
                <h2 className="@lg:text-xl font-semibold text-pretty">
                  {item.property.title}
                </h2>
              </Link>
              <p className="text-muted-foreground flex items-center mt-1 gap-1">
                <MapPin className="size-4" />
                {item.property.address}
              </p>
            </section>
            <Avatar className="size-10 hidden @lg:block">
              <AvatarImage
                src={item.property.host.image || ""}
                alt={item.property.host.name}
              />
              <AvatarFallback>
                {item.property.host.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Stack>

          <Grid className="grid-cols-1 @lg:grid-cols-2 gap-4">
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

        {item.status === "Pending" && <PendingActions />}
        {item.status === "Confirmed" && <ConfirmedActions />}
        {item.status === "Paid" && <PaidActions trip={item} />}
        {item.status === "Cancelled" && <CancelledActions />}
      </Stack>
    </Card>
  );
}

function PendingActions() {
  return (
    <Stack className="gap-3">
      <span className="text-muted-foreground bg-muted rounded-md py-2 px-4 font-medium text-sm">
        Waiting for confirmation
      </span>
      <CancelButton />
    </Stack>
  );
}

function CancelledActions() {
  return (
    <span className="text-destructive bg-destructive/10 rounded-lg py-2 px-4 shadow font-medium text-sm">
      Trip cancelled
    </span>
  );
}

function ConfirmedActions() {
  const handleReview = () => {
    // Logic to message the host
    console.log("Message host clicked");
  };

  return (
    <Stack className="gap-3">
      <Button variant="secondary" onClick={handleReview}>
        Pay now
      </Button>
      <CancelButton />
    </Stack>
  );
}

function PaidActions({ trip }: { trip: Trip }) {
  const isCompleted = new Date(trip.checkInDate) < new Date();
  const isReviewed = trip.review !== null;

  if (isReviewed) {
    return (
      <span className="text-muted-foreground bg-muted rounded-lg py-2 px-4 shadow font-medium text-sm">
        Review left
      </span>
    );
  }

  const handleReview = () => {
    // Logic to leave a review
    console.log("Leave a review clicked");
  };

  if (isCompleted) {
    return (
      <Stack className="gap-3">
        <Button variant="outline" onClick={handleReview}>
          Leave a review
        </Button>
      </Stack>
    );
  }

  return (
    <Stack className="gap-3">
      <span className="text-green-600 bg-green-600/10 rounded-lg py-2 px-4 shadow font-medium text-sm">
        Trip paid
      </span>
      <CancelButton />
    </Stack>
  );
}

function CancelButton() {
  const handleCancel = () => {
    // Logic to cancel
    console.log("Cancel clicked");
  };

  return (
    <Button variant="destructive" onClick={handleCancel}>
      Cancel
    </Button>
  );
}
