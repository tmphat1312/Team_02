"use client";

import { Container } from "@/components/layout/container";
import { Grid } from "@/components/layout/grid";
import { TextAlert } from "@/components/typography/text-alert";
import { PAGE_SIZE } from "@/features/listing/config/settings";
import { useRooms } from "@/features/listing/hooks/use-rooms";

import { LoadMoreButton } from "./load-more-button";
import { Room, RoomFallback } from "./room";

export function RoomList() {
  const { isEmpty, isLoadingMore, properties } = useRooms();

  if (isEmpty) {
    return <RoomListEmpty />;
  }

  return (
    <Container className="py-6 space-y-8">
      <Grid className="gap-x-6 gap-y-10 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
        {properties.map((room, i) => (
          <Room key={i} item={room} />
        ))}
        {isLoadingMore && <RoomListFallback />}
      </Grid>
      <LoadMoreButton />
    </Container>
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
