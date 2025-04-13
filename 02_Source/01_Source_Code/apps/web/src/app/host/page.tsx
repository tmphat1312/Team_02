import Image from "next/image";
import Link from "next/link";
import {
  Bell,
  ChevronDown,
  Facebook,
  Globe,
  Instagram,
  Twitter,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function HostHomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <Link href="/">
              <Image
                src="/placeholder.svg?height=32&width=32"
                alt="Airbnb"
                width={32}
                height={32}
                className="text-rose-500"
              />
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/hosting"
              className="border-b-2 border-black py-2 text-sm font-medium"
            >
              Today
            </Link>
            <Link
              href="/hosting/calendar"
              className="py-2 text-sm font-medium text-gray-500 hover:text-black"
            >
              Calendar
            </Link>
            <Link
              href="/hosting/listings"
              className="py-2 text-sm font-medium text-gray-500 hover:text-black"
            >
              Listings
            </Link>
            <Link
              href="/hosting/messages"
              className="py-2 text-sm font-medium text-gray-500 hover:text-black"
            >
              Messages
            </Link>
            <Button
              variant="ghost"
              className="text-sm font-medium text-gray-500 hover:text-black"
            >
              Menu <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
          </nav>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder.svg" alt="User" />
              <AvatarFallback>MP</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-semibold mb-16">
            Welcome back, Minh Phat
          </h1>

          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-medium">Your reservations</h2>
              <Link href="/hosting/reservations" className="text-sm underline">
                All reservations (0)
              </Link>
            </div>

            <Tabs defaultValue="checking-out">
              <TabsList className="grid grid-cols-5 max-w-3xl mb-6">
                <TabsTrigger
                  value="checking-out"
                  className="data-[state=active]:bg-black data-[state=active]:text-white rounded-full"
                >
                  Checking out (0)
                </TabsTrigger>
                <TabsTrigger
                  value="hosting"
                  className="data-[state=active]:bg-black data-[state=active]:text-white rounded-full"
                >
                  Currently hosting (0)
                </TabsTrigger>
                <TabsTrigger
                  value="arriving"
                  className="data-[state=active]:bg-black data-[state=active]:text-white rounded-full"
                >
                  Arriving soon (0)
                </TabsTrigger>
                <TabsTrigger
                  value="upcoming"
                  className="data-[state=active]:bg-black data-[state=active]:text-white rounded-full"
                >
                  Upcoming (0)
                </TabsTrigger>
                <TabsTrigger
                  value="pending"
                  className="data-[state=active]:bg-black data-[state=active]:text-white rounded-full"
                >
                  Pending review (0)
                </TabsTrigger>
              </TabsList>

              <TabsContent
                value="checking-out"
                className="bg-gray-50 p-12 rounded-lg flex flex-col items-center justify-center"
              >
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mb-4">
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
                  >
                    <path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h1" />
                    <path d="M12 3h1a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-1" />
                    <path d="M2 13h20" />
                    <path d="M13 16v3" />
                    <path d="M19 16v3" />
                    <path d="M5 16v3" />
                    <path d="M11 16v3" />
                    <path d="M17 16v3" />
                    <path d="M3 16v3" />
                    <path d="M9 16v3" />
                    <path d="M15 16v3" />
                    <path d="M21 16v3" />
                  </svg>
                </div>
                <p className="text-center">
                  You don't have any guests
                  <br />
                  checking out today
                  <br />
                  or tomorrow.
                </p>
              </TabsContent>

              <TabsContent
                value="hosting"
                className="bg-gray-50 p-12 rounded-lg flex flex-col items-center justify-center"
              >
                <p className="text-center">
                  You are not currently hosting any guests.
                </p>
              </TabsContent>

              <TabsContent
                value="arriving"
                className="bg-gray-50 p-12 rounded-lg flex flex-col items-center justify-center"
              >
                <p className="text-center">
                  You don't have any guests arriving soon.
                </p>
              </TabsContent>

              <TabsContent
                value="upcoming"
                className="bg-gray-50 p-12 rounded-lg flex flex-col items-center justify-center"
              >
                <p className="text-center">
                  You don't have any upcoming reservations.
                </p>
              </TabsContent>

              <TabsContent
                value="pending"
                className="bg-gray-50 p-12 rounded-lg flex flex-col items-center justify-center"
              >
                <p className="text-center">
                  You don't have any pending reviews.
                </p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <footer className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-sm hover:underline">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:underline">
                    Get help with a safety issue
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:underline">
                    AirCover
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:underline">
                    Anti-discrimination
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:underline">
                    Disability support
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:underline">
                    Cancellation options
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:underline">
                    Report neighborhood concern
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Hosting</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-sm hover:underline">
                    Airbnb your home
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:underline">
                    AirCover for Hosts
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:underline">
                    Hosting resources
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:underline">
                    Community forum
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:underline">
                    Hosting responsibly
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:underline">
                    Airbnb-friendly apartments
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:underline">
                    Join a free Hosting class
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:underline">
                    Find a co-host
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Airbnb</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-sm hover:underline">
                    Newsroom
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:underline">
                    New features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:underline">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:underline">
                    Investors
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:underline">
                    Gift cards
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:underline">
                    Airbnb.org emergency stays
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
              <p className="text-sm">© 2025 Airbnb, Inc.</p>
              <div className="flex items-center space-x-4">
                <Link href="#" className="text-sm hover:underline">
                  Terms
                </Link>
                <Link href="#" className="text-sm hover:underline">
                  Sitemap
                </Link>
                <Link href="#" className="text-sm hover:underline">
                  Privacy
                </Link>
                <div className="flex items-center space-x-1">
                  <Link href="#" className="text-sm hover:underline">
                    Your Privacy Choices
                  </Link>
                  <svg width="26" height="12" fill="none">
                    <rect
                      x="0.5"
                      y="0.5"
                      width="25"
                      height="11"
                      rx="5.5"
                      fill="white"
                      stroke="#DDDDDD"
                    />
                    <path
                      d="M14 3.5C11.9 3.5 10.5 5.1 10.5 6.5C10.5 8 11.9 9.5 14 9.5C16.1 9.5 17.5 8 17.5 6.5C17.5 5.1 16.1 3.5 14 3.5Z"
                      fill="#00B0D7"
                    />
                    <path
                      d="M6.5 3.5C4.4 3.5 3 5.1 3 6.5C3 8 4.4 9.5 6.5 9.5C8.6 9.5 10 8 10 6.5C10 5.1 8.6 3.5 6.5 3.5Z"
                      fill="#00B0D7"
                    />
                    <path
                      d="M6.5 8C7.3 8 8 7.3 8 6.5C8 5.7 7.3 5 6.5 5C5.7 5 5 5.7 5 6.5C5 7.3 5.7 8 6.5 8Z"
                      fill="white"
                    />
                    <path
                      d="M14 8C14.8 8 15.5 7.3 15.5 6.5C15.5 5.7 14.8 5 14 5C13.2 5 12.5 5.7 12.5 6.5C12.5 7.3 13.2 8 14 8Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <div className="flex items-center">
                <Globe className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">English (US)</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium">VND</span>
              </div>
              <Link href="#" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
