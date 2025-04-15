import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function PropertyReservation() {
  return (
    <div>
      <div className="border rounded-xl p-6 shadow-l">
        <div className="mb-4">
          <span className="text-2xl font-bold">đ2,060,935</span>
          <span className="text-muted-foreground"> night</span>
        </div>

        <div className="grid grid-cols-2 border rounded-lg overflow-hidden mb-4">
          <div className="p-3 border-r border-b">
            <div className="text-xs font-semibold">CHECK-IN</div>
            <div>7/6/2025</div>
          </div>
          <div className="p-3 border-b">
            <div className="text-xs font-semibold">CHECKOUT</div>
            <div>7/11/2025</div>
          </div>
          <div className="p-3 col-span-2 flex justify-between items-center">
            <div>
              <div className="text-xs font-semibold">GUESTS</div>
              <div>1 guest</div>
            </div>
            <ChevronDownIcon size={20} />
          </div>
        </div>

        <Button
          className="w-full mb-4 bg-rose-500 hover:bg-rose-600 text-white"
          size="lg"
        >
          Reserve
        </Button>
        <p className="text-center text-sm text-muted-foreground mb-6">
          You won&apos;t be charged yet
        </p>

        <div className="space-y-4">
          <div className="flex justify-between">
            <span>đ2,060,935 x 5 nights</span>
            <span>đ10,304,675</span>
          </div>
          <div className="flex justify-between">
            <span>Airbnb service fee</span>
            <span>đ1,518,102</span>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="flex justify-between font-bold">
          <span>Total before taxes</span>
          <span>đ12,270,806</span>
        </div>
      </div>
    </div>
  );
}
