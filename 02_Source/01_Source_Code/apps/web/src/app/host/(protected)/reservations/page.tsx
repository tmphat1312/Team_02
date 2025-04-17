import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronDown, Download, Filter, Star } from "lucide-react";
import Link from "next/link";

// Sample reservation data
const reservations = [
  {
    id: "res_1",
    guestName: "Emma Wilson",
    guestImage: "/placeholder.svg?height=40&width=40",
    propertyName: "Cozy Mountain Cabin",
    checkIn: "Apr 15, 2025",
    checkOut: "Apr 20, 2025",
    guests: 2,
    total: "$750",
    status: "confirmed",
  },
  {
    id: "res_2",
    guestName: "Michael Chen",
    guestImage: "/placeholder.svg?height=40&width=40",
    propertyName: "Beachfront Villa",
    checkIn: "May 3, 2025",
    checkOut: "May 10, 2025",
    guests: 4,
    total: "$1,450",
    status: "confirmed",
  },
  {
    id: "res_3",
    guestName: "Sarah Johnson",
    guestImage: "/placeholder.svg?height=40&width=40",
    propertyName: "Downtown Loft",
    checkIn: "Jun 12, 2025",
    checkOut: "Jun 15, 2025",
    guests: 2,
    total: "$480",
    status: "confirmed",
  },
];

// Sample completed reservations
const completedReservations = [
  {
    id: "res_4",
    guestName: "David Brown",
    guestImage: "/placeholder.svg?height=40&width=40",
    propertyName: "Cozy Mountain Cabin",
    checkIn: "Mar 5, 2025",
    checkOut: "Mar 10, 2025",
    guests: 3,
    total: "$620",
    status: "completed",
    rating: 5,
  },
  {
    id: "res_5",
    guestName: "Jessica Lee",
    guestImage: "/placeholder.svg?height=40&width=40",
    propertyName: "Downtown Loft",
    checkIn: "Feb 18, 2025",
    checkOut: "Feb 22, 2025",
    guests: 1,
    total: "$380",
    status: "completed",
    rating: 4,
  },
];

// Sample canceled reservations
const canceledReservations = [
  {
    id: "res_6",
    guestName: "Robert Taylor",
    guestImage: "/placeholder.svg?height=40&width=40",
    propertyName: "Beachfront Villa",
    checkIn: "Apr 2, 2025",
    checkOut: "Apr 8, 2025",
    guests: 5,
    total: "$1,200",
    status: "canceled",
    cancelReason: "Guest plans changed",
  },
];

export default function ReservationsPage() {
  return (
    <div className="width-container py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Reservations</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Export as CSV</DropdownMenuItem>
              <DropdownMenuItem>Export as PDF</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Tabs defaultValue="upcoming">
        <TabsList className="mb-8 border-b pb-px">
          <TabsTrigger
            value="upcoming"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent"
          >
            Upcoming
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent"
          >
            Completed
          </TabsTrigger>
          <TabsTrigger
            value="canceled"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent"
          >
            Canceled
          </TabsTrigger>
          <TabsTrigger
            value="all"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent"
          >
            All
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-0">
          {reservations.length > 0 ? (
            <div className="space-y-4">
              {reservations.map((reservation) => (
                <div
                  key={reservation.id}
                  className="rounded-lg border p-4 shadow-sm"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={reservation.guestImage || "/placeholder.svg"}
                          alt={reservation.guestName}
                        />
                        <AvatarFallback>
                          {reservation.guestName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{reservation.guestName}</h3>
                        <p className="text-sm text-muted-foreground">
                          {reservation.propertyName}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-6">
                      <div>
                        <p className="text-sm font-medium">Check-in</p>
                        <p className="text-sm text-muted-foreground">
                          {reservation.checkIn}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Check-out</p>
                        <p className="text-sm text-muted-foreground">
                          {reservation.checkOut}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Guests</p>
                        <p className="text-sm text-muted-foreground">
                          {reservation.guests}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Total</p>
                        <p className="text-sm text-muted-foreground">
                          {reservation.total}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Message
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16">
              <p className="mb-2 text-lg font-medium">
                You have no upcoming reservations
              </p>
              <Link href="#" className="text-rose-500 underline">
                See all reservations
              </Link>
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="mt-0">
          {completedReservations.length > 0 ? (
            <div className="space-y-4">
              {completedReservations.map((reservation) => (
                <div
                  key={reservation.id}
                  className="rounded-lg border p-4 shadow-sm"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={reservation.guestImage || "/placeholder.svg"}
                          alt={reservation.guestName}
                        />
                        <AvatarFallback>
                          {reservation.guestName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{reservation.guestName}</h3>
                        <p className="text-sm text-muted-foreground">
                          {reservation.propertyName}
                        </p>
                        <div className="mt-1 flex items-center">
                          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                          <span className="ml-1 text-sm">
                            {reservation.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-6">
                      <div>
                        <p className="text-sm font-medium">Check-in</p>
                        <p className="text-sm text-muted-foreground">
                          {reservation.checkIn}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Check-out</p>
                        <p className="text-sm text-muted-foreground">
                          {reservation.checkOut}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Guests</p>
                        <p className="text-sm text-muted-foreground">
                          {reservation.guests}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Total</p>
                        <p className="text-sm text-muted-foreground">
                          {reservation.total}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16">
              <p className="mb-2 text-lg font-medium">
                You have no completed reservations
              </p>
              <Link href="#" className="text-rose-500 underline">
                See all reservations
              </Link>
            </div>
          )}
        </TabsContent>

        <TabsContent value="canceled" className="mt-0">
          {canceledReservations.length > 0 ? (
            <div className="space-y-4">
              {canceledReservations.map((reservation) => (
                <div
                  key={reservation.id}
                  className="rounded-lg border p-4 shadow-sm"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={reservation.guestImage || "/placeholder.svg"}
                          alt={reservation.guestName}
                        />
                        <AvatarFallback>
                          {reservation.guestName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{reservation.guestName}</h3>
                        <p className="text-sm text-muted-foreground">
                          {reservation.propertyName}
                        </p>
                        <p className="mt-1 text-sm text-rose-500">
                          Canceled: {reservation.cancelReason}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-6">
                      <div>
                        <p className="text-sm font-medium">Check-in</p>
                        <p className="text-sm text-muted-foreground">
                          {reservation.checkIn}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Check-out</p>
                        <p className="text-sm text-muted-foreground">
                          {reservation.checkOut}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Guests</p>
                        <p className="text-sm text-muted-foreground">
                          {reservation.guests}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Total</p>
                        <p className="text-sm text-muted-foreground">
                          {reservation.total}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16">
              <p className="mb-2 text-lg font-medium">
                You have no canceled reservations
              </p>
              <Link href="#" className="text-rose-500 underline">
                See all reservations
              </Link>
            </div>
          )}
        </TabsContent>

        <TabsContent value="all" className="mt-0">
          <div className="space-y-4">
            {[
              ...reservations,
              ...completedReservations,
              ...canceledReservations,
            ].map((reservation) => (
              <div
                key={reservation.id}
                className="rounded-lg border p-4 shadow-sm"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={reservation.guestImage || "/placeholder.svg"}
                        alt={reservation.guestName}
                      />
                      <AvatarFallback>
                        {reservation.guestName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{reservation.guestName}</h3>
                      <p className="text-sm text-muted-foreground">
                        {reservation.propertyName}
                      </p>
                      {reservation.status === "canceled" && (
                        <p className="mt-1 text-sm text-rose-500">Canceled</p>
                      )}
                      {reservation.status === "completed" &&
                        reservation.rating && (
                          <div className="mt-1 flex items-center">
                            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                            <span className="ml-1 text-sm">
                              {reservation.rating}
                            </span>
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-6">
                    <div>
                      <p className="text-sm font-medium">Check-in</p>
                      <p className="text-sm text-muted-foreground">
                        {reservation.checkIn}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Check-out</p>
                      <p className="text-sm text-muted-foreground">
                        {reservation.checkOut}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Guests</p>
                      <p className="text-sm text-muted-foreground">
                        {reservation.guests}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Total</p>
                      <p className="text-sm text-muted-foreground">
                        {reservation.total}
                      </p>
                    </div>
                    {reservation.status === "confirmed" && (
                      <Button variant="outline" size="sm">
                        Message
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-12 border-t pt-8 text-center">
        <p className="text-muted-foreground">
          How can we make it easier to manage your reservations?
          <Link href="#" className="ml-1 font-medium text-rose-500">
            Share your feedback
          </Link>
        </p>
      </div>
    </div>
  );
}
