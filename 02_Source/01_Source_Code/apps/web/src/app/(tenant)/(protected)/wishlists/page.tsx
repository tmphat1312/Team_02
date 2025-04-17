import { Button } from "@/components/ui/button";
import { Heart, Star } from "lucide-react";
import Image from "next/image";

const mockRecentlyViewed: {
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

export default function WishlistsPage() {
  return (
    <section className="pt-8 pb-16">
      <h1 className="sr-only">Wishlists</h1>
      <section className="mb-8">
        <h2 className="text-2xl font-medium mb-4">Wishlists</h2>
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
      </section>
      <section className="">
        <h2 className="text-2xl font-medium mb-4">Recently viewed</h2>
        <div className="flex gap-8 flex-wrap">
          {mockRecentlyViewed.map((item) => (
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
      </section>
    </section>
  );
}
