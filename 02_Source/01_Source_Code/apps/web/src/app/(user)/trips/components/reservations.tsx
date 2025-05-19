"use client";

import { parseAsStringEnum, useQueryState } from "nuqs";

import { Grid } from "@/components/layout/grid";
import { TextAlert } from "@/components/typography/text-alert";
import { useUserContext } from "@/features/auth/contexts/UserContext";

import { Trip } from "@/typings/models";
import { useTenantReservations } from "../hooks/use-tenant-reservations";
import { Reservation } from "./reservation";

export function Reservations() {
  const tenant = useUserContext();
  const { data: trips } = useTenantReservations(tenant.id);
  const [activeTab] = useQueryState(
    "tab",
    parseAsStringEnum(["all", "upcoming", "completed", "cancelled"])
  );

  const isLoading = !trips;

  if (isLoading) {
    return <TextAlert>Loading...</TextAlert>;
  }

  const filteredTrips =
    activeTab == "all"
      ? trips
      : trips.filter((trip) => tripFilter(trip, activeTab));
  const isEmpty = filteredTrips.length === 0;

  if (isEmpty) {
    return <TextAlert>There is no trips yet.</TextAlert>;
  }

  return (
    <Grid className="grid-cols-1 lg:grid-cols-2 gap-6">
      {filteredTrips.map((trip) => (
        <Reservation key={trip.id} item={trip} />
      ))}
    </Grid>
  );
}

function tripFilter(trip: Trip, activeTab: string | null) {
  const today = new Date();
  const checkInDate = new Date(trip.checkInDate);

  if (activeTab === null || activeTab === "all") {
    return true;
  }
  if (activeTab === "cancelled") {
    return trip.status === "Canceled";
  }
  if (activeTab === "upcoming") {
    return checkInDate > today;
  }
  if (activeTab === "completed") {
    return checkInDate <= today;
  }
  return false;
}
