import { format } from "date-fns";
import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Trip } from "@/typings/models";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatPrice, makePluralNoun } from "@/lib/utils";

import { CancelledActions } from "./cancelled-actions";
import { CompletedActions } from "./completed-actions";
import { UpcomingActions } from "./upcoming-actions";

type ReservationCardProps = {
  item: Trip;
};

export function ReservationCard({ item }: ReservationCardProps) {
  return (
    <Card className="p-0 overflow-clip block @container">
      <div className="@lg:flex">
        <Image
          src={item.property.imageUrls[0]}
          alt={item.property.name}
          width={240}
          height={240}
          className="object-cover w-full max-h-60 @lg:size-60"
        />

        <div className="p-4 grow space-y-4">
          <section className="flex items-start justify-between">
            <div>
              <Link
                href={`/properties/${item.propertyId}`}
                className="hover:underline"
              >
                <h2 className="@lg:text-xl font-semibold text-pretty">
                  {item.property.name}
                </h2>
              </Link>
              <p className="text-gray-600 flex items-center mt-1 gap-1">
                <MapPin className="size-4" />
                {item.property.address}
              </p>
            </div>
            <Avatar className="size-10 hidden @lg:block">
              <AvatarImage
                src={item.property.host.image}
                alt={item.property.host.name}
              />
              <AvatarFallback>
                {item.property.host.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </section>

          <div className="grid grid-cols-1 @lg:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Check-in</p>
              <p className="font-medium flex items-center gap-1">
                <Calendar className="size-4" />
                {format(item.checkInDate, "MMM d, yyyy")}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Check-out</p>
              <p className="font-medium flex items-center gap-1">
                <Calendar className="size-4" />
                {format(item.checkOutDate, "MMM d, yyyy")}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Guests</p>
              <p className="font-medium">
                {makePluralNoun("guest", item.numberOfGuests)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      <div className="flex items-center p-4 justify-between">
        <div>
          <p className="text-sm text-gray-600">Total</p>
          <p className="font-semibold">{formatPrice(item.totalPrice)}</p>
        </div>

        {item.status === "upcoming" && <UpcomingActions />}
        {item.status === "completed" && <CompletedActions />}
        {item.status === "cancelled" && <CancelledActions />}
      </div>
    </Card>
  );
}
