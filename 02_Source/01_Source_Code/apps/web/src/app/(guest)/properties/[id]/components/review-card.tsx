import { Star } from "lucide-react";

import { ReviewWithTenant } from "@/typings/models";
import { Stack } from "@/components/layout/stack";
import {
  calculateAvgRating,
  calculateRelativeTime,
  formatRelativeTime,
} from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { DefaultUserAvatar } from "@/components/icons/default-user-avatar";

export function ReviewCard({ item }: { item: ReviewWithTenant }) {
  return (
    <article key={item.id}>
      <Stack className="gap-4 mb-3.5">
        <Avatar className="size-12">
          <AvatarImage src={item.tenant.image || ""} alt={item.tenant.name} />
          <AvatarFallback>
            <DefaultUserAvatar className="text-gray-600/50" />
          </AvatarFallback>
        </Avatar>
        <section>
          <h5 className="font-medium">{item.tenant.name}</h5>
          <p>
            {calculateRelativeTime(new Date(item.tenant.createdAt))} on Rento
          </p>
        </section>
      </Stack>
      <div className="flex items-center gap-2 mb-0.5">
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
