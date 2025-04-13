import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Home,
  MessageSquare,
  Bell,
  Search,
  LayoutGrid,
  Plus,
  ChevronDown,
} from "lucide-react";

// Sample listing data
const listings = [
  {
    id: "listing_1",
    title: "Minh Phat House",
    location: "Phước Vân, Long An",
    image: "/placeholder.svg?height=400&width=600",
    actionRequired: true,
    price: 85,
    rating: 4.92,
    reviews: 128,
    type: "Entire home",
    beds: 3,
    baths: 2,
  },
  {
    id: "listing_2",
    title: "Test property",
    location: "tt. Bến Lức, Long An",
    image: "/placeholder.svg?height=400&width=600",
    actionRequired: true,
    price: 120,
    rating: 4.85,
    reviews: 64,
    type: "Unique stay",
    beds: 2,
    baths: 1,
  },
  {
    id: "listing_3",
    title: "Beachfront Villa",
    location: "Vũng Tàu, Bà Rịa - Vũng Tàu",
    image: "/placeholder.svg?height=400&width=600",
    actionRequired: false,
    price: 250,
    rating: 4.98,
    reviews: 215,
    type: "Entire villa",
    beds: 5,
    baths: 4,
  },
  {
    id: "listing_4",
    title: "City Center Apartment",
    location: "District 1, Ho Chi Minh City",
    image: "/placeholder.svg?height=400&width=600",
    actionRequired: false,
    price: 75,
    rating: 4.78,
    reviews: 183,
    type: "Entire apartment",
    beds: 2,
    baths: 1,
  },
];

export default function ListingsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Main navigation */}
      <div className="border-b">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <svg
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 fill-rose-500"
            >
              <path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 6.114 12.54 7.1 14.836l.145.353c.667 1.591.91 2.472.96 3.396l.01.415.001.228c0 4.062-2.877 6.478-6.357 6.478-2.224 0-4.556-1.258-6.709-3.386l-.257-.26-.172-.179h-.011l-.176.185c-2.044 2.1-4.267 3.42-6.414 3.62l-.28.023-.267.006C5.377 31 2.5 28.584 2.5 24.522l.005-.469c.026-.928.23-1.768.83-3.244l.216-.524c.966-2.298 6.083-12.989 7.707-16.034C12.537 1.963 13.992 1 16 1z" />
            </svg>
            <span className="text-xl font-medium">Listings</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Avatar>
              <AvatarImage
                src="/placeholder.svg?height=40&width=40"
                alt="User"
              />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      {/* Secondary navigation */}
      <div className="border-b">
        <div className="container flex items-center space-x-8 py-4">
          <Link
            href="#"
            className="flex items-center gap-2 text-sm font-medium"
          >
            Today
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 text-sm font-medium"
          >
            <Calendar className="h-4 w-4" />
            Calendar
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 text-sm font-medium border-b-2 border-black pb-[17px]"
          >
            <Home className="h-4 w-4" />
            Listings
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 text-sm font-medium"
          >
            <MessageSquare className="h-4 w-4" />
            Messages
          </Link>
          <Button
            variant="ghost"
            className="flex items-center gap-1 text-sm font-medium"
          >
            Menu
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="container py-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Your listings</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="rounded-full">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => (
            <div
              key={listing.id}
              className="group overflow-hidden rounded-xl border"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={listing.image || "/placeholder.svg"}
                  alt={listing.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {listing.actionRequired && (
                  <div className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-medium text-rose-500 shadow-sm">
                    <div className="flex items-center gap-1">
                      <div className="h-2 w-2 rounded-full bg-rose-500"></div>
                      Action required
                    </div>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-medium">{listing.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {listing.location}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">
                      ${listing.price} night
                    </p>
                    <div className="mt-1 flex items-center text-sm text-muted-foreground">
                      <span className="mr-1">★</span>
                      <span>{listing.rating}</span>
                      <span className="mx-1">·</span>
                      <span>{listing.reviews} reviews</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-sm font-medium">Support</h3>
            <div className="space-y-2">
              <Link
                href="#"
                className="block text-sm text-muted-foreground hover:underline"
              >
                Help Center
              </Link>
              <Link
                href="#"
                className="block text-sm text-muted-foreground hover:underline"
              >
                AirCover
              </Link>
              <Link
                href="#"
                className="block text-sm text-muted-foreground hover:underline"
              >
                Safety information
              </Link>
              <Link
                href="#"
                className="block text-sm text-muted-foreground hover:underline"
              >
                Supporting people with disabilities
              </Link>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-medium">Hosting</h3>
            <div className="space-y-2">
              <Link
                href="#"
                className="block text-sm text-muted-foreground hover:underline"
              >
                Airbnb your home
              </Link>
              <Link
                href="#"
                className="block text-sm text-muted-foreground hover:underline"
              >
                AirCover for Hosts
              </Link>
              <Link
                href="#"
                className="block text-sm text-muted-foreground hover:underline"
              >
                Hosting resources
              </Link>
              <Link
                href="#"
                className="block text-sm text-muted-foreground hover:underline"
              >
                Community forum
              </Link>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-medium">Airbnb</h3>
            <div className="space-y-2">
              <Link
                href="#"
                className="block text-sm text-muted-foreground hover:underline"
              >
                Newsroom
              </Link>
              <Link
                href="#"
                className="block text-sm text-muted-foreground hover:underline"
              >
                New features
              </Link>
              <Link
                href="#"
                className="block text-sm text-muted-foreground hover:underline"
              >
                Careers
              </Link>
              <Link
                href="#"
                className="block text-sm text-muted-foreground hover:underline"
              >
                Investors
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
