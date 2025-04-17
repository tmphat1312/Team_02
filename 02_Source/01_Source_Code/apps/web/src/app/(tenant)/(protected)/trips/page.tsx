"use client";

import { BookX, Calendar, Coins, MapPin, MessageSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const mockTrips = [
  {
    id: "trip1",
    status: "upcoming",
    property: {
      id: "prop1",
      name: "Beachfront Villa with Infinity Pool",
      location: "Bali, Indonesia",
      image: "/placeholder.svg?height=300&width=300",
    },
    host: {
      name: "Sarah",
      image: "/placeholder.svg?height=40&width=40",
      responseRate: "100%",
    },
    dates: {
      checkIn: "Jun 15, 2025",
      checkOut: "Jun 22, 2025",
    },
    guests: 2,
    totalPrice: "$1,450",
    hasUnreadMessages: true,
  },
  {
    id: "trip2",
    status: "upcoming",
    property: {
      id: "prop2",
      name: "Mountain Cabin with Hot Tub",
      location: "Aspen, Colorado",
      image: "/placeholder.svg?height=300&width=300",
    },
    host: {
      name: "Michael",
      image: "/placeholder.svg?height=40&width=40",
      responseRate: "95%",
    },
    dates: {
      checkIn: "Jul 10, 2025",
      checkOut: "Jul 15, 2025",
    },
    guests: 4,
    totalPrice: "$980",
    hasUnreadMessages: false,
  },
  {
    id: "trip3",
    status: "completed",
    property: {
      id: "prop3",
      name: "Luxury Apartment in City Center",
      location: "Paris, France",
      image: "/placeholder.svg?height=300&width=300",
    },
    host: {
      name: "Julia",
      image: "/placeholder.svg?height=40&width=40",
      responseRate: "98%",
    },
    dates: {
      checkIn: "Mar 5, 2025",
      checkOut: "Mar 10, 2025",
    },
    guests: 2,
    totalPrice: "$850",
    hasUnreadMessages: false,
  },
  {
    id: "trip4",
    status: "completed",
    property: {
      id: "prop4",
      name: "Cozy Cottage by the Lake",
      location: "Lake Tahoe, California",
      image: "/placeholder.svg?height=300&width=300",
    },
    host: {
      name: "David",
      image: "/placeholder.svg?height=40&width=40",
      responseRate: "92%",
    },
    dates: {
      checkIn: "Jan 15, 2025",
      checkOut: "Jan 20, 2025",
    },
    guests: 3,
    totalPrice: "$720",
    hasUnreadMessages: false,
  },
  {
    id: "trip5",
    status: "cancelled",
    property: {
      id: "prop5",
      name: "Modern Loft with City Views",
      location: "New York, NY",
      image: "/placeholder.svg?height=300&width=300",
    },
    host: {
      name: "Emma",
      image: "/placeholder.svg?height=40&width=40",
      responseRate: "97%",
    },
    dates: {
      checkIn: "Feb 20, 2025",
      checkOut: "Feb 25, 2025",
    },
    guests: 2,
    totalPrice: "$950",
    hasUnreadMessages: false,
    cancellationDate: "Jan 15, 2025",
  },
];

export default function TripsPage() {
  const [activeTab, setActiveTab] = useState<
    "all" | "upcoming" | "completed" | "cancelled"
  >("all");

  const filteredTrips =
    activeTab == "all"
      ? mockTrips
      : mockTrips.filter((trip) => trip.status === activeTab);

  return (
    <section className="pt-8 pb-16">
      <h1 className="text-3xl font-medium mb-8">Trips</h1>

      <div>
        <div className="flex gap-3 mb-4">
          <Button
            variant="outline"
            size="lg"
            className={cn(
              "rounded-full border-border/50 font-normal border-2",
              {
                "border-black": activeTab === "all",
              }
            )}
            onClick={() => setActiveTab("all")}
          >
            All
          </Button>
          <Button
            variant="outline"
            size="lg"
            className={cn(
              "rounded-full border-border/50 font-normal border-2",
              {
                "border-black": activeTab === "upcoming",
              }
            )}
            onClick={() => setActiveTab("upcoming")}
          >
            Upcoming
          </Button>
          <Button
            variant="outline"
            size="lg"
            className={cn(
              "rounded-full border-border/50 font-normal border-2",
              {
                "border-black": activeTab === "completed",
              }
            )}
            onClick={() => setActiveTab("completed")}
          >
            Completed
          </Button>
          <Button
            variant="outline"
            size="lg"
            className={cn(
              "rounded-full border-border/50 font-normal border-2",
              {
                "border-black": activeTab === "cancelled",
              }
            )}
            onClick={() => setActiveTab("cancelled")}
          >
            Cancelled
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-6">
          {filteredTrips.map((trip) => (
            <div key={trip.id} className="border rounded-xl overflow-clip">
              <div className="flex">
                <Image
                  src={"/placeholder.svg"}
                  alt={trip.property.name}
                  width={256}
                  height={256}
                  className="object-cover size-64"
                />
                <div className="p-4 grow space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-xl font-semibold">
                        {trip.property.name}
                      </h2>
                      <p className="text-gray-600 flex items-center mt-1 gap-1">
                        <MapPin className="size-4" />
                        {trip.property.location}
                      </p>
                    </div>
                    <Avatar className="size-10">
                      <AvatarImage src={trip.host.image} alt={trip.host.name} />
                      <AvatarFallback>
                        {trip.host.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Check-in</p>
                      <p className="font-medium flex items-center gap-1">
                        <Calendar className="size-4" />
                        {trip.dates.checkIn}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Check-out</p>
                      <p className="font-medium flex items-center gap-1">
                        <Calendar className="size-4" />
                        {trip.dates.checkOut}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Guests</p>
                      <p className="font-medium">
                        {trip.guests} {trip.guests === 1 ? "guest" : "guests"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="flex items-center p-4 justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="font-semibold">{trip.totalPrice}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="rounded-lg gap-2">
                    <MessageSquare className="size-4" />
                    Message host
                  </Button>
                  <Button variant="outline" className="rounded-lg gap-2">
                    <Coins className="size-4" />
                    Pay now
                  </Button>
                  <Button variant="outline" className="rounded-lg gap-2">
                    <BookX className="size-4" />
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 border-t pt-8">
        <p>
          Can&apos;t find your reservation here?{" "}
          <Link href="#" className="underline">
            Visit the Help Center
          </Link>
        </p>
      </div>
    </section>
  );
}
