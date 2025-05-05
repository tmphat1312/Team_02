"use client";

import { useRooms } from "../_hooks/use-rooms";

import { cn } from "@/lib/utils";

import { PAGE_SIZE } from "../_config/settings";

import { Button } from "@/components/ui/button";
import { Room, RoomFallback } from "./room";

export function RoomList() {
  const { isEmpty, isLoadingMore, properties } = useRooms();

  if (isEmpty) {
    return (
      <div className="width-container py-6 text-center">
        No properties found
      </div>
    );
  }

  return (
    <div className="width-container py-6 space-y-8">
      <div className="grid grid-cols-4 gap-x-6 gap-y-10">
        {properties.map((room, i) => (
          <Room key={i} item={room} />
        ))}
        {isLoadingMore && <RoomListFallback />}
      </div>
      <LoadMoreButton />
    </div>
  );
}

function LoadMoreButton() {
  const { loadMore, isReachingEnd, isLoadingMore, isLoading } = useRooms();

  return (
    <div className="flex items-center justify-center">
      <Button
        onClick={loadMore}
        disabled={isReachingEnd}
        size="lg"
        className={cn(
          "disabled:hidden",
          "bg-black/80 hover:bg-black/90",
          isLoading || isLoadingMore ? "opacity-50" : ""
        )}
      >
        {isLoading || isLoadingMore ? "Loading..." : "Load more"}
      </Button>
      {isReachingEnd && (
        <p className="text-sm text-gray-500">
          You have reached the end of the list
        </p>
      )}
    </div>
  );
}

export function RoomListFallback() {
  return (
    <>
      {Array.from({ length: PAGE_SIZE }).map((_, i) => (
        <RoomFallback key={i} />
      ))}
    </>
  );
}
