"use client";

import { Grid } from "@/components/layout/grid";
import { Stack } from "@/components/layout/stack";
import { TextAlert } from "@/components/typography/text-alert";
import { PAGE_SIZE } from "@/features/listing/config/settings";
import { useRooms } from "@/features/listing/hooks/use-rooms";
import { cn } from "@/lib/utils";

import { useIsMapOpen } from "../hooks/use-is-map-open";
import { LoadMoreButton } from "./load-more-button";
import { Room, RoomFallback } from "./room";

export function RoomList() {
  const { isEmpty, isLoadingMore, properties } = useRooms();
  const { isMapOpen } = useIsMapOpen();


  if (isEmpty) {
    return <RoomListEmpty />;
  }

  return (
    <Stack orientation="vertical" className="gap-8 mb-16">
      <Grid
        className={cn(
          "gap-x-6 gap-y-10",
          isMapOpen
            ? "grid-cols-[repeat(auto-fill,minmax(200px,1fr))]"
            : "grid-cols-[repeat(auto-fill,minmax(240px,1fr))]"
        )}
      >
        {properties.map((room, i) => (
          <Room key={i} item={room} />
        ))}
        {isLoadingMore && <RoomListFallback />}
      </Grid>
      <LoadMoreButton />
    </Stack>
  );
}

export function RoomListEmpty() {
  return <TextAlert className="py-8 text-center">No rooms found</TextAlert>;
}

export function RoomListFallback() {
  return Array.from({ length: PAGE_SIZE }).map((_, i) => (
    <RoomFallback key={i} />
  ));
}
