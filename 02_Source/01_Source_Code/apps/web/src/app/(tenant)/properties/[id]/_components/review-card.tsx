import { Review } from "@/app/typings/models";
import { calculateAvgRating, formatRelativeTime } from "@/lib/utils";
import { Star } from "lucide-react";

export function ReviewCard({ item }: { item: Review }) {
  return (
    <article key={item.id}>
      <section className="flex items-center gap-4 mb-3.5">
        <div className="size-12 rounded-full bg-gray-200" />
        <div>
          <h5 className="font-medium">Noorin</h5>
          <p>12 years on Airbnb</p>
        </div>
      </section>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-0.5">
          <StarValue numberOfStars={Math.round(calculateAvgRating(item))} />
        </div>
        <span>· {formatRelativeTime(new Date(item.createdAt))}</span>
      </div>
      <section>
        <p>{item.content}</p>
      </section>
    </article>
  );
}

function StarValue({ numberOfStars }: { numberOfStars: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: numberOfStars }, (_, i) => (
        <Star key={i} className="fill-current" size={10} />
      ))}
    </div>
  );
}
