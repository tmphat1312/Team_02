import { Heart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Property } from "@/app/typings/models";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { formatPrice } from "@/lib/utils";

type RoomProps = {
  item: Property;
};

export function Room({ item: room }: RoomProps) {
  return (
    <Link
      key={room.id}
      href={`/properties/${room.id}`}
      className="group space-y-2"
    >
      <div className="relative aspect-square overflow-hidden rounded-xl">
        <Image
          src={room.imageUrls[0] ?? "/placeholder.svg"}
          alt={room.title}
          className="size-full object-cover"
          width={300}
          height={300}
        />
        <Button variant="ghost" className="absolute top-2 right-2 rounded-full">
          <Heart size={32} />
        </Button>
      </div>

      <article>
        <section className="flex justify-between">
          <h3 className="font-semibold">{room.title}</h3>
          <div className="flex items-center gap-1">
            <Star className="fill-current size-4" />
            <span>{room.rating ?? "N/A"}</span>
          </div>
        </section>
        <p className="text-sm text-muted-foreground">{room.location}</p>
        <div>
          <span className="font-semibold">
            {formatPrice(room.pricePerNight)}
          </span>
          <span> per night</span>
        </div>
      </article>
    </Link>
  );
}

export function RoomFallback() {
  return (
    <div className="group space-y-2">
      <Skeleton className="w-full aspect-square rounded-xl" />
      <div>
        <Skeleton className="w-2/3 h-6 mb-1" />
        <Skeleton className="w-1/3 h-4 mb-1" />
        <Skeleton className="w-1/2 h-5" />
      </div>
    </div>
  );
}
