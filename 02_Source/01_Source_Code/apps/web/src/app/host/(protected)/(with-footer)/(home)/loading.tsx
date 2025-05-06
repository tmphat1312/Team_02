import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ListingCardFallback } from "./_components/listing-card";

export default function Loading() {
  return (
    <div className="py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Your listings</h1>
        <Button variant="outline" size="icon" className="rounded-full" disabled>
          <Plus className="size-4" />
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <ListingCardFallback key={index} />
        ))}
      </div>
    </div>
  );
}
