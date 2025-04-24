import { Heart, Star } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";

import { PageSection } from "./page-section";

const mockWishlists: {
  id: string;
  name: string;
  imageUrl: string;
  rating: number;
  viewedAt: string;
}[] = [
  {
    id: "1",
    name: "Product 1",
    imageUrl: "https://via.placeholder.com/150",
    rating: 4.5,
    viewedAt: "2023-10-01T12:00:00Z",
  },
  {
    id: "2",
    name: "Product 2",
    imageUrl: "https://via.placeholder.com/150",
    rating: 4.0,
    viewedAt: "2023-10-02T12:00:00Z",
  },
  {
    id: "3",
    name: "Product 3",
    imageUrl: "https://via.placeholder.com/150",
    rating: 5.0,
    viewedAt: "2023-10-03T12:00:00Z",
  },
];

export function Wishlist() {
  return (
    <div>
      <PageSection heading="Wishlists">
        <div className="flex gap-8 flex-wrap">
          {mockWishlists.map((item) => (
            <article key={item.id} className="relative">
              <Image
                src="./placeholder.svg"
                width={280}
                height={280}
                className="size-70 rounded-2xl mb-2.5"
                alt={item.name}
              />
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">{item.name}</h3>
                <span className="inline-flex items-center gap-1 opacity-70">
                  <Star className="fill-current mt-0.5" size={12} />
                  {item.rating}
                </span>
              </div>
              <p>{new Date(item.viewedAt).toISOString()}</p>
              <Button
                className="rounded-full absolute top-3 right-3"
                variant="ghost"
                size="icon"
              >
                <Heart />
              </Button>
            </article>
          ))}
        </div>
      </PageSection>
    </div>
  );
}
