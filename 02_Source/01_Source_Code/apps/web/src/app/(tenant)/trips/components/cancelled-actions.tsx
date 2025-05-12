import { Button } from "@/components/ui/button";

export function CancelledActions() {
  const isRefunded = true; // Replace with actual logic to check if the trip is refunded
  return (
    <div>
      {isRefunded ? (
        <span className="text-red-800 bg-red-100 rounded-full py-2 px-4">
          Refund processed
        </span>
      ) : (
        <Button variant={"secondary"} size={"lg"}>
          Request refund
        </Button>
      )}
    </div>
  );
}
