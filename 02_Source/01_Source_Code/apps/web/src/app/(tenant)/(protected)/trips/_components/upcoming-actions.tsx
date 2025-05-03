"use client";

import { BookX, Coins, Ellipsis, MessageSquare } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
    <div className="">
      <div className="hidden gap-3 sm:flex">
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
        </PopoverContent>
      </Popover>
    </div>
  );
}
