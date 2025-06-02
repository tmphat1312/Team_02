"use client";

import { Bell } from "lucide-react";
import Link from "next/link";

import { useUserContext } from "@/features/auth/contexts/UserContext";
import { fetchHostReservations } from "@/features/reservation/data/fetch-host-reservations";
import { makePluralNoun } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

import { TextAlert } from "../typography/text-alert";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Skeleton } from "../ui/skeleton";
import { Stack } from "./stack";

export function HostNotifications() {
  const host = useUserContext();
  const query = useQuery({
    queryKey: ["host-reservations", host.id],
    queryFn: () => fetchHostReservations(host.id),
    refetchInterval: 10_000,
  });

  if (query.isLoading) {
    return <Skeleton className="size-10 rounded-full" />;
  }

  const reservations = query.data || [];

  const newReservationCount = reservations.filter(
    (r) => r.status === "Pending"
  ).length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="rounded-full size-10 relative"
        >
          <Bell />
          {newReservationCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-primary/80 rounded-full size-5 flex items-center justify-center text-xs text-white scale-95">
              {newReservationCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="p-0 w-xs">
        {newReservationCount === 0 ? (
          <Stack className="p-4">
            <TextAlert>No new notifications</TextAlert>
          </Stack>
        ) : (
          <Link
            href={"/host/reservations?tab=new"}
            className="p-4 block hover:bg-gray-50"
          >
            <h4>New Reservation</h4>
            <TextAlert>
              <strong>
                {makePluralNoun("new reservation", newReservationCount)}
              </strong>
              &nbsp;waiting for confirmation.
            </TextAlert>
          </Link>
        )}
      </PopoverContent>
    </Popover>
  );
}
