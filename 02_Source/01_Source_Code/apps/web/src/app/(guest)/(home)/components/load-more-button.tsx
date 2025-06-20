import { Stack } from "@/components/layout/stack";
import { TextAlert } from "@/components/typography/text-alert";
import { Button } from "@/components/ui/button";
import { useRooms } from "@/features/listing/hooks/use-rooms";
import { cn } from "@/lib/utils";

export function LoadMoreButton() {
  const { loadMore, isReachingEnd, isLoadingMore, isLoading } = useRooms();

  return (
    <Stack className="justify-center">
      <Button
        onClick={loadMore}
        disabled={isReachingEnd}
        size="lg"
        variant={"secondary"}
        className={cn(
          "disabled:hidden",
          isLoading || isLoadingMore ? "opacity-50" : ""
        )}
      >
        {isLoading || isLoadingMore ? "Loading..." : "Load more"}
      </Button>
      {isReachingEnd && (
        <TextAlert>You have reached the end of the list</TextAlert>
      )}
    </Stack>
  );
}
