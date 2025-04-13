import { Heart, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Filter } from "@/components/icons/filter";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";

type Category = {
  name: string;
  imageUrl: string;
};

const works: Category[] = [
  {
    name: "Cottage",
    imageUrl: "./placeholder.svg",
  },
  {
    name: "Cabin",
    imageUrl: "./placeholder.svg",
  },
  {
    name: "Treehouse",
    imageUrl: "./placeholder.svg",
  },
  {
    name: "Mansion",
    imageUrl: "./placeholder.svg",
  },
  {
    name: "Luxe",
    imageUrl: "./placeholder.svg",
  },
  {
    name: "Amazing views",
    imageUrl: "./placeholder.svg",
  },
  {
    name: "Beachfront",
    imageUrl: "./placeholder.svg",
  },
  {
    name: "Countryside",
    imageUrl: "./placeholder.svg",
  },
  {
    name: "Tiny homes",
    imageUrl: "./placeholder.svg",
  },
  // 20 more items
  {
    name: "Amazing views",
    imageUrl: "./placeholder.svg",
  },
  {
    name: "Beachfront",
    imageUrl: "./placeholder.svg",
  },
  {
    name: "Countryside",
    imageUrl: "./placeholder.svg",
  },
  {
    name: "Tiny homes",
    imageUrl: "./placeholder.svg",
  },
  {
    name: "Amazing views",
    imageUrl: "./placeholder.svg",
  },
  {
    name: "Amazing views",
    imageUrl: "./placeholder.svg",
  },
  {
    name: "Beachfront",
    imageUrl: "./placeholder.svg",
  },
  {
    name: "Countryside",
    imageUrl: "./placeholder.svg",
  },
  {
    name: "Tiny homes",
    imageUrl: "./placeholder.svg",
  },
  {
    name: "Amazing views",
    imageUrl: "./placeholder.svg",
  },
  {
    name: "Amazing views",
    imageUrl: "./placeholder.svg",
  },
  {
    name: "Beachfront",
    imageUrl: "./placeholder.svg",
  },
  {
    name: "Countryside",
    imageUrl: "./placeholder.svg",
  },
  {
    name: "Tiny homes",
    imageUrl: "./placeholder.svg",
  },
  {
    name: "Amazing views",
    imageUrl: "./placeholder.svg",
  },
  {
    name: "Amazing views",
    imageUrl: "./placeholder.svg",
  },
  {
    name: "Beachfront",
    imageUrl: "./placeholder.svg",
  },
  {
    name: "Countryside",
    imageUrl: "./placeholder.svg",
  },
  {
    name: "Tiny homes",
    imageUrl: "./placeholder.svg",
  },
  {
    name: "Amazing views",
    imageUrl: "./placeholder.svg",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="container px-4 py-6">
        <div className="grid grid-cols-[54rem_22.5rem] gap-4 justify-between">
          <ScrollArea className="">
            <div className="flex w-max space-x-4">
              {works.map((artwork, index) => (
                <figure key={artwork.name + index} className="shrink-0 mb-2">
                  <div className="overflow-hidden flex flex-col items-center">
                    <Image
                      src={artwork.imageUrl}
                      alt={`Photo by ${artwork.name}`}
                      className="aspect-1 size-[40px] object-cover rounded-md"
                      width={40}
                      height={40}
                    />
                  </div>
                  <figcaption className="mt-1 text-xs text-muted-foreground text-center">
                    {artwork.name}
                  </figcaption>
                </figure>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="h-1.5" />
          </ScrollArea>

          <div className="mb-2 flex justify-end gap-4 col-span-1">
            <Button variant="outline" className="h-[48px] font-normal">
              <Filter /> Filters
            </Button>
            <label className="h-[48px] border flex items-center justify-center rounded-md gap-2 text-sm px-4">
              Display total before taxes <Switch />
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <Link key={i} href="/properties/222" className="group">
              <div className="relative aspect-square overflow-hidden rounded-xl">
                <Image
                  src={`/placeholder.svg?height=300&width=300&text=Property+${
                    i + 1
                  }`}
                  alt={`Property ${i + 1}`}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  width={300}
                  height={300}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-3 top-3 h-8 w-8 rounded-full text-white opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <Heart />
                  <span className="sr-only">Add to favorites</span>
                </Button>
              </div>
              <div className="mt-2">
                <div className="flex justify-between">
                  <h3 className="font-semibold">Location {i + 1}</h3>
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 fill-current"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    <span className="ml-1 text-sm">4.{9 - (i % 3)}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="flex items-center">
                    <MapPin className="mr-1 h-3 w-3" /> {100 + i * 10} miles
                    away
                  </span>
                </p>
                <p className="text-sm text-muted-foreground">
                  Available {i % 2 === 0 ? "next week" : "this weekend"}
                </p>
                <p className="mt-1">
                  <span className="font-semibold">${80 + i * 10}</span> night
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
