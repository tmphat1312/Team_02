import { Button } from "@/components/ui/button";
import { MessageSquare, Coins, BookX } from "lucide-react";

export function UpcomingActions() {
  const handleMessageHost = () => {
    // navigate to the message host page
  };
  const handlePayNow = () => {
    // navigate to the payment page
  };
  const handleCancel = () => {
    // navigate to the cancellation page
  };

  return (
    <div className="flex gap-3">
      <Button
        variant="outline"
        className="rounded-lg gap-2"
        onClick={handleMessageHost}
      >
        <MessageSquare className="size-4" />
        Message host
      </Button>
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
  );
}
