"use client";

import { useState } from "react";
import {
  Globe,
  Menu,
  Calendar,
  MapPin,
  ChevronRight,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Mock data for trips
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
    status: "past",
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
    status: "past",
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
  const [activeTab, setActiveTab] = useState("upcoming");

  const filteredTrips = mockTrips.filter((trip) => trip.status === activeTab);
  const hasUpcomingTrips = mockTrips.some((trip) => trip.status === "upcoming");
  const hasPastTrips = mockTrips.some((trip) => trip.status === "past");
  const hasCancelledTrips = mockTrips.some(
    (trip) => trip.status === "cancelled"
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Trips</h1>

        <Tabs
          defaultValue="upcoming"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="mb-8 border-b w-full justify-start rounded-none bg-transparent h-auto p-0 space-x-8">
            <TabsTrigger
              value="upcoming"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-2"
            >
              Upcoming
              {hasUpcomingTrips && (
                <Badge className="ml-2 bg-[#ff385c] hover:bg-[#ff385c]">
                  {
                    mockTrips.filter((trip) => trip.status === "upcoming")
                      .length
                  }
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="past"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-2"
            >
              Past
              {hasPastTrips && (
                <Badge className="ml-2 bg-gray-500 hover:bg-gray-500">
                  {mockTrips.filter((trip) => trip.status === "past").length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="cancelled"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-2"
            >
              Cancelled
              {hasCancelledTrips && (
                <Badge className="ml-2 bg-gray-500 hover:bg-gray-500">
                  {
                    mockTrips.filter((trip) => trip.status === "cancelled")
                      .length
                  }
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-0">
            {filteredTrips.length > 0 ? (
              <div className="space-y-6">
                {filteredTrips.map((trip) => (
                  <div
                    key={trip.id}
                    className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="md:flex">
                      <div className="md:w-1/3 h-48 md:h-auto relative">
                        <img
                          src={trip.property.image || "/placeholder.svg"}
                          alt={trip.property.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6 md:w-2/3">
                        <div className="flex flex-col h-full">
                          <div>
                            <div className="flex items-start justify-between">
                              <div>
                                <h2 className="text-xl font-semibold">
                                  {trip.property.name}
                                </h2>
                                <p className="text-gray-600 flex items-center mt-1">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  {trip.property.location}
                                </p>
                              </div>
                              <div className="flex-shrink-0">
                                <Avatar className="h-10 w-10">
                                  <img
                                    src={trip.host.image || "/placeholder.svg"}
                                    alt={trip.host.name}
                                  />
                                </Avatar>
                              </div>
                            </div>

                            <div className="mt-4 flex flex-wrap gap-y-2">
                              <div className="w-full sm:w-1/2">
                                <p className="text-sm text-gray-500">
                                  Check-in
                                </p>
                                <p className="font-medium flex items-center">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  {trip.dates.checkIn}
                                </p>
                              </div>
                              <div className="w-full sm:w-1/2">
                                <p className="text-sm text-gray-500">
                                  Check-out
                                </p>
                                <p className="font-medium flex items-center">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  {trip.dates.checkOut}
                                </p>
                              </div>
                            </div>

                            <div className="mt-4">
                              <p className="text-sm text-gray-500">Guests</p>
                              <p className="font-medium">
                                {trip.guests}{" "}
                                {trip.guests === 1 ? "guest" : "guests"}
                              </p>
                            </div>
                          </div>

                          <div className="mt-6 flex items-center justify-between pt-4 border-t border-gray-100">
                            <div>
                              <p className="text-sm text-gray-500">Total</p>
                              <p className="font-semibold">{trip.totalPrice}</p>
                            </div>
                            <div className="flex space-x-2">
                              {trip.hasUnreadMessages && (
                                <Badge className="bg-[#ff385c]">
                                  New message
                                </Badge>
                              )}
                              <Button variant="outline" className="rounded-lg">
                                <MessageSquare className="h-4 w-4 mr-2" />
                                Message host
                              </Button>
                              <Button className="rounded-lg bg-[#ff385c] hover:bg-[#ff385c]/90">
                                View reservation
                                <ChevronRight className="h-4 w-4 ml-1" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 border border-gray-200 rounded-xl">
                <h3 className="text-xl font-medium">No upcoming trips</h3>
                <p className="text-gray-500 mt-2 mb-6">
                  Time to dust off your bags and start planning your next
                  adventure.
                </p>
                <Button className="bg-[#ff385c] hover:bg-[#ff385c]/90 rounded-lg">
                  Start searching
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="past" className="mt-0">
            {filteredTrips.length > 0 ? (
              <div className="space-y-6">
                {filteredTrips.map((trip) => (
                  <div
                    key={trip.id}
                    className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="md:flex">
                      <div className="md:w-1/3 h-48 md:h-auto relative">
                        <img
                          src={trip.property.image || "/placeholder.svg"}
                          alt={trip.property.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6 md:w-2/3">
                        <div className="flex flex-col h-full">
                          <div>
                            <div className="flex items-start justify-between">
                              <div>
                                <h2 className="text-xl font-semibold">
                                  {trip.property.name}
                                </h2>
                                <p className="text-gray-600 flex items-center mt-1">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  {trip.property.location}
                                </p>
                              </div>
                              <div className="flex-shrink-0">
                                <Avatar className="h-10 w-10">
                                  <img
                                    src={trip.host.image || "/placeholder.svg"}
                                    alt={trip.host.name}
                                  />
                                </Avatar>
                              </div>
                            </div>

                            <div className="mt-4 flex flex-wrap gap-y-2">
                              <div className="w-full sm:w-1/2">
                                <p className="text-sm text-gray-500">
                                  Check-in
                                </p>
                                <p className="font-medium flex items-center">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  {trip.dates.checkIn}
                                </p>
                              </div>
                              <div className="w-full sm:w-1/2">
                                <p className="text-sm text-gray-500">
                                  Check-out
                                </p>
                                <p className="font-medium flex items-center">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  {trip.dates.checkOut}
                                </p>
                              </div>
                            </div>

                            <div className="mt-4">
                              <p className="text-sm text-gray-500">Guests</p>
                              <p className="font-medium">
                                {trip.guests}{" "}
                                {trip.guests === 1 ? "guest" : "guests"}
                              </p>
                            </div>
                          </div>

                          <div className="mt-6 flex items-center justify-between pt-4 border-t border-gray-100">
                            <div>
                              <p className="text-sm text-gray-500">Total</p>
                              <p className="font-semibold">{trip.totalPrice}</p>
                            </div>
                            <div className="flex space-x-2">
                              <Button variant="outline" className="rounded-lg">
                                <MessageSquare className="h-4 w-4 mr-2" />
                                Message host
                              </Button>
                              <Button className="rounded-lg bg-black hover:bg-black/90">
                                Book again
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 border border-gray-200 rounded-xl">
                <h3 className="text-xl font-medium">No past trips</h3>
                <p className="text-gray-500 mt-2 mb-6">
                  You haven't completed any trips yet.
                </p>
                <Button className="bg-[#ff385c] hover:bg-[#ff385c]/90 rounded-lg">
                  Start searching
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="cancelled" className="mt-0">
            {filteredTrips.length > 0 ? (
              <div className="space-y-6">
                {filteredTrips.map((trip) => (
                  <div
                    key={trip.id}
                    className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="md:flex">
                      <div className="md:w-1/3 h-48 md:h-auto relative">
                        <img
                          src={trip.property.image || "/placeholder.svg"}
                          alt={trip.property.name}
                          className="w-full h-full object-cover opacity-70"
                        />
                        <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-sm font-medium">
                          Cancelled on {trip.cancellationDate}
                        </div>
                      </div>
                      <div className="p-6 md:w-2/3">
                        <div className="flex flex-col h-full">
                          <div>
                            <div className="flex items-start justify-between">
                              <div>
                                <h2 className="text-xl font-semibold">
                                  {trip.property.name}
                                </h2>
                                <p className="text-gray-600 flex items-center mt-1">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  {trip.property.location}
                                </p>
                              </div>
                              <div className="flex-shrink-0">
                                <Avatar className="h-10 w-10">
                                  <img
                                    src={trip.host.image || "/placeholder.svg"}
                                    alt={trip.host.name}
                                  />
                                </Avatar>
                              </div>
                            </div>

                            <div className="mt-4 flex flex-wrap gap-y-2">
                              <div className="w-full sm:w-1/2">
                                <p className="text-sm text-gray-500">
                                  Check-in (cancelled)
                                </p>
                                <p className="font-medium flex items-center text-gray-500 line-through">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  {trip.dates.checkIn}
                                </p>
                              </div>
                              <div className="w-full sm:w-1/2">
                                <p className="text-sm text-gray-500">
                                  Check-out (cancelled)
                                </p>
                                <p className="font-medium flex items-center text-gray-500 line-through">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  {trip.dates.checkOut}
                                </p>
                              </div>
                            </div>

                            <div className="mt-4">
                              <p className="text-sm text-gray-500">Guests</p>
                              <p className="font-medium text-gray-500">
                                {trip.guests}{" "}
                                {trip.guests === 1 ? "guest" : "guests"}
                              </p>
                            </div>
                          </div>

                          <div className="mt-6 flex items-center justify-between pt-4 border-t border-gray-100">
                            <div>
                              <p className="text-sm text-gray-500">
                                Total (refunded)
                              </p>
                              <p className="font-semibold text-gray-500 line-through">
                                {trip.totalPrice}
                              </p>
                            </div>
                            <div className="flex space-x-2">
                              <Button className="rounded-lg bg-[#ff385c] hover:bg-[#ff385c]/90">
                                Book similar
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 border border-gray-200 rounded-xl">
                <h3 className="text-xl font-medium">No cancelled trips</h3>
                <p className="text-gray-500 mt-2">
                  You don't have any cancelled reservations.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="mt-8 text-center border-t border-gray-200 pt-8">
          <p className="text-gray-600">
            Can't find your reservation here?{" "}
            <Link href="/help" className="text-[#ff385c] underline">
              Visit the Help Center
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
