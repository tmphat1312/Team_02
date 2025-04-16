import Link from "next/link";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function HostHomePage() {
  return (
    <div className="width-container">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold mb-16">
          Welcome back, Minh Phat
        </h1>

        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-medium">Your reservations</h2>
            <Link href="/host/reservations" className="text-sm underline">
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
                value="host"
                className="data-[state=active]:bg-black data-[state=active]:text-white rounded-full"
              >
                Currently host (0)
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
                You don&apos;t have any guests
                <br />
                checking out today
                <br />
                or tomorrow.
              </p>
            </TabsContent>

            <TabsContent
              value="host"
              className="bg-gray-50 p-12 rounded-lg flex flex-col items-center justify-center"
            >
              <p className="text-center">
                You are not currently host any guests.
              </p>
            </TabsContent>

            <TabsContent
              value="arriving"
              className="bg-gray-50 p-12 rounded-lg flex flex-col items-center justify-center"
            >
              <p className="text-center">
                You don&apos;t have any guests arriving soon.
              </p>
            </TabsContent>

            <TabsContent
              value="upcoming"
              className="bg-gray-50 p-12 rounded-lg flex flex-col items-center justify-center"
            >
              <p className="text-center">
                You don&apos;t have any upcoming reservations.
              </p>
            </TabsContent>

            <TabsContent
              value="pending"
              className="bg-gray-50 p-12 rounded-lg flex flex-col items-center justify-center"
            >
              <p className="text-center">
                You don&apos;t have any pending reviews.
              </p>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
