import { Heart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

type Room = {
  id: number;
  name: string;
  imageUrl: string;
  location: string;
  distance: string;
  price: number;
  rating: number;
  available: string;
};

const rooms: Room[] = [
  {
    id: 1,
    name: "Cozy Cottage",
    imageUrl: "/placeholder.svg",
    location: "Aspen, Colorado",
    distance: "120 miles away",
    price: 150,
    rating: 4.8,
    available: "April 10 - 20",
  },
  {
    id: 2,
    name: "Modern Apartment",
    imageUrl: "/placeholder.svg",
    location: "New York City, New York",
    distance: "10 miles away",
    price: 250,
    rating: 4.5,
    available: "April 10 - 20",
  },
  {
    id: 3,
    name: "Beachfront Villa",
    imageUrl: "/placeholder.svg",
    location: "Malibu, California",
    distance: "300 miles away",
    price: 400,
    rating: 4.9,
    available: "April 10 - 20",
  },
  {
    id: 4,
    name: "Rustic Cabin",
    imageUrl: "/placeholder.svg",
    location: "Lake Tahoe, Nevada",
    distance: "200 miles away",
    price: 180,
    rating: 4.6,
    available: "April 10 - 20",
  },
  {
    id: 5,
    name: "Luxury Penthouse",
    imageUrl: "/placeholder.svg",
    location: "Miami, Florida",
    distance: "500 miles away",
    price: 600,
    rating: 4.7,
    available: "April 10 - 20",
  },
  {
    id: 6,
    name: "Countryside Retreat",
    imageUrl: "/placeholder.svg",
    location: "Nashville, Tennessee",
    distance: "150 miles away",
    price: 200,
    rating: 4.4,
    available: "April 10 - 20",
  },
  {
    id: 7,
    name: "Urban Loft",
    imageUrl: "/placeholder.svg",
    location: "Chicago, Illinois",
    distance: "50 miles away",
    price: 220,
    rating: 4.5,
    available: "April 10 - 20",
  },
  {
    id: 8,
    name: "Mountain Chalet",
    imageUrl: "/placeholder.svg",
    location: "Denver, Colorado",
    distance: "100 miles away",
    price: 300,
    rating: 4.8,
    available: "April 10 - 20",
  },
  {
    id: 9,
    name: "Seaside Bungalow",
    imageUrl: "/placeholder.svg",
    location: "Santa Monica, California",
    distance: "400 miles away",
    price: 350,
    rating: 4.9,
    available: "April 10 - 20",
  },
  {
    id: 10,
    name: "Historic Townhouse",
    imageUrl: "/placeholder.svg",
    location: "Boston, Massachusetts",
    distance: "80 miles away",
    price: 270,
    rating: 4.6,
    available: "April 10 - 20",
  },
  {
    id: 11,
    name: "Tropical Paradise",
    imageUrl: "/placeholder.svg",
    location: "Honolulu, Hawaii",
    distance: "2500 miles away",
    price: 700,
    rating: 4.9,
    available: "April 10 - 20",
  },
  {
    id: 12,
    name: "Desert Oasis",
    imageUrl: "/placeholder.svg",
    location: "Phoenix, Arizona",
    distance: "350 miles away",
    price: 320,
    rating: 4.7,
    available: "April 10 - 20",
  },
];

export function RoomList() {
  return (
    <div className="width-container pt-6 space-y-12">
      <div className="grid grid-cols-4 gap-x-6 gap-y-10">
        {rooms.map((room, i) => (
          <Link
            key={room.id}
            href={`/properties/${room.id}`}
            className="group space-y-2"
          >
            <div className="relative aspect-square overflow-hidden rounded-xl">
              <Image
                src="/placeholder.svg"
                alt={`Property ${i + 1}`}
                className="size-full object-cover"
                width={300}
                height={300}
              />
              <Button
                variant="ghost"
                className="absolute top-2 right-2 rounded-full"
              >
                <Heart size={32} />
              </Button>
            </div>

            <article>
              <section className="flex justify-between">
                <h3 className="font-semibold">{room.location}</h3>
                <div className="flex items-center gap-1">
                  <Star className="fill-current size-4" />
                  <span>{room.rating}</span>
                </div>
              </section>
              <p className="text-sm text-muted-foreground">{room.distance}</p>
              <p className="text-sm text-muted-foreground">{room.available}</p>
              <span className="font-semibold">${80 + i * 10}</span> night
            </article>
          </Link>
        ))}
      </div>

      <div className="flex flex-col gap-3 items-center">
        <span className="text-lg font-medium">Continue exploring</span>
        <Button className="text-base h-12 px-6 py-3.5 bg-black/80 hover:bg-black/90">
          Show more
        </Button>
      </div>
    </div>
  );
}

export function RoomListFallback() {
  return <div>Loading..</div>;
}
