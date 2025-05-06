import { Reservation } from "@/app/typings/models";
import { Star } from "lucide-react";

type PendingReviewListProps = {
  items: Reservation[];
};

export function PendingReviewList({ items }: PendingReviewListProps) {
  if (items.length === 0) {
    return (
      <section className="flex flex-col items-center gap-4">
        <Star className="size-20 text-gray-500" />
        <h3>No reservations ready for review today. Checkout tomorrow.</h3>
      </section>
    );
  }

  return <div>PendingReviewList Component</div>;
}
