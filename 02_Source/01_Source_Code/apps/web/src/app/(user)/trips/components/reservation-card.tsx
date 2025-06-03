import { format } from "date-fns";
import { BookX, Calendar, Coins, Ellipsis, MapPin, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Grid } from "@/components/layout/grid";
import { Stack } from "@/components/layout/stack";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn, formatPrice, makePluralNoun } from "@/lib/utils";
import { Trip } from "@/typings/models";

type Props = {
  item: Trip;
};

export function ReservationCard({ item }: Props) {
  return (
    <Card
      className={cn(
        "p-0 overflow-clip block @container",
        item.status === "cancelled" && "border-s-8 border-s-destructive/20",
        item.status === "completed" && "border-s-8 border-s-muted",
        item.status === "upcoming" && "border-s-8 border-s-secondary"
      )}
    >
      <div className="@lg:flex">
        <Image
          src={item.property.imageUrls[0]}
          alt={item.property.name}
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
                  {item.property.name}
                </h2>
              </Link>
              <p className="text-muted-foreground flex items-center mt-1 gap-1">
                <MapPin className="size-4" />
                {item.property.address}
              </p>
            </section>
            <Avatar className="size-10 hidden @lg:block">
              <AvatarImage
                src={item.property.host.image}
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

        {item.status === "upcoming" && <UpcomingActions />}
        {item.status === "completed" && <CompletedActions />}
        {item.status === "cancelled" && <CancelledActions />}
      </Stack>
    </Card>
  );
}

function CancelledActions() {
  return (
    <span className="text-destructive bg-destructive/10 rounded-lg py-2 px-4 shadow font-medium text-sm">
      Refund processed
    </span>
  );
}

function CompletedActions() {
  const handleReview = () => {
    // Logic to message the host
    console.log("Message host clicked");
  };

  return (
    <Button
      variant="outline"
      className="rounded-lg gap-2"
      onClick={handleReview}
    >
      <Star className="size-4" />
      Leave a review
    </Button>
  );
}

function UpcomingActions() {
  const handlePayNow = () => {
    // navigate to the payment page
  };
  const handleCancel = () => {
    // navigate to the cancellation page
  };

  return (
    <div className="">
      <div className="hidden gap-3 sm:flex">
        <Button
          variant="secondary"
          className="rounded-lg gap-2"
          onClick={handlePayNow}
        >
          <Coins className="size-4" />
          Pay now
        </Button>
        <Button
          variant="destructive"
          className="rounded-lg gap-2"
          onClick={handleCancel}
        >
          <BookX className="size-4" />
          Cancel
        </Button>
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="rounded-lg gap-2 mt-4 sm:hidden">
            <Ellipsis className="size-4" />
            More actions
          </Button>
        </PopoverTrigger>
        <PopoverContent className="max-w-50" side="top">
          <div className="flex flex-col gap-2">
            <Button
              variant="secondary"
              className="rounded-lg gap-2"
              onClick={handlePayNow}
            >
              <Coins className="size-4" />
              Pay now
            </Button>
            <Button
              variant="destructive"
              className="rounded-lg gap-2"
              onClick={handleCancel}
            >
              <BookX className="size-4" />
              Cancel
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
