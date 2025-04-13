import { ChevronDownIcon, HeartIcon, ShareIcon, StarIcon } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function AirbnbRoomDetails() {
  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <main className="container mx-auto px-4 md:px-6 py-6">
        {/* Property Title */}
        <h1 className="text-2xl font-bold mb-4">Auberge Yugashira</h1>

        {/* Navigation Menu */}
        <div className="flex border-b mb-6">
          <Button
            variant="ghost"
            className="px-6 py-3 font-medium relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-black"
          >
            Photos
          </Button>
          <Button variant="ghost" className="px-6 py-3 font-medium">
            Amenities
          </Button>
          <Button variant="ghost" className="px-6 py-3 font-medium">
            Reviews
          </Button>
          <Button variant="ghost" className="px-6 py-3 font-medium">
            Location
          </Button>
        </div>

        {/* Photo Gallery */}
        <div className="relative mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 rounded-xl overflow-hidden">
            <div className="md:col-span-2 md:row-span-2 relative aspect-square md:aspect-auto">
              <Image
                src="/placeholder.svg?height=600&width=600"
                alt="Traditional Japanese wooden building exterior"
                width={600}
                height={600}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="hidden md:block relative aspect-square">
              <Image
                src="/placeholder.svg?height=300&width=300"
                alt="Bedroom with white bedding"
                width={300}
                height={300}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="hidden md:block relative aspect-square">
              <Image
                src="/placeholder.svg?height=300&width=300"
                alt="View of water and mountains"
                width={300}
                height={300}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="hidden md:block relative aspect-square">
              <Image
                src="/placeholder.svg?height=300&width=300"
                alt="Traditional Japanese slippers"
                width={300}
                height={300}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="hidden md:block relative aspect-square">
              <Image
                src="/placeholder.svg?height=300&width=300"
                alt="Breakfast with view"
                width={300}
                height={300}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          <Button
            variant="secondary"
            size="sm"
            className="absolute bottom-4 right-4 rounded-lg"
          >
            Show all photos
          </Button>
          <div className="absolute top-4 right-4 flex gap-2">
            <Button variant="secondary" size="icon" className="rounded-full">
              <ShareIcon className="h-4 w-4" />
            </Button>
            <Button variant="secondary" size="icon" className="rounded-full">
              <HeartIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Property Details and Booking */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Property Info */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold">
                Private room in farm stay in Imabari, Japan
              </h2>
              <p className="text-muted-foreground">
                3 guests · 1 bedroom · 1 private bath
              </p>
            </div>

            <Separator className="my-6" />

            {/* Guest Favorite */}
            <div className="flex items-center gap-4 p-4 border rounded-xl mb-6">
              <div className="flex flex-col items-center">
                <span className="text-yellow-500 text-2xl">🏆</span>
                <span className="text-sm font-medium">Guest</span>
                <span className="text-sm font-medium">favorite</span>
              </div>
              <div>
                <p className="font-semibold">
                  One of the most loved homes on Airbnb, according to guests
                </p>
              </div>
              <div className="ml-auto flex flex-col items-center">
                <div className="flex items-center">
                  <span className="font-semibold text-lg">4.98</span>
                </div>
                <div className="flex">
                  <StarIcon className="h-4 w-4 fill-current text-black" />
                  <StarIcon className="h-4 w-4 fill-current text-black" />
                  <StarIcon className="h-4 w-4 fill-current text-black" />
                  <StarIcon className="h-4 w-4 fill-current text-black" />
                  <StarIcon className="h-4 w-4 fill-current text-black" />
                </div>
                <span className="text-sm text-muted-foreground">
                  136 Reviews
                </span>
              </div>
            </div>

            {/* Description would go here */}
            <div className="prose max-w-none mb-6">
              <p>
                Experience traditional Japanese farm life in this charming
                private room. Nestled in the beautiful countryside of Imabari,
                our auberge offers a peaceful retreat with stunning views of the
                surrounding mountains and sea.
              </p>
              <p>
                The room features traditional tatami flooring and comfortable
                futon bedding. Guests have access to a private bathroom and
                shared common areas. Wake up to a delicious homemade breakfast
                featuring local ingredients from our farm.
              </p>
            </div>

            {/* Bedroom Section */}
            <div className="mb-6">
              <div className="flex gap-4 items-start">
                <div className="w-32 h-24 relative rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=200&width=150"
                    alt="Bedroom with floor mattresses"
                    width={150}
                    height={200}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Bedroom</h3>
                  <p className="text-muted-foreground">3 floor mattresses</p>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* What this place offers */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-6">
                What this place offers
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-6 flex justify-center">
                    <svg
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      aria-hidden="true"
                      role="presentation"
                      focusable="false"
                    >
                      <path d="M28 2a2 2 0 0 1 2 2v24a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 2H4v24h24zM16 7a9 9 0 0 1 8.043 13H7.957A9 9 0 0 1 16 7zm0 2a7 7 0 0 0-6.591 9h13.182A7 7 0 0 0 16 9zm-7 11h14v2H9zm10 4h4v2h-4z"></path>
                    </svg>
                  </div>
                  <span>Bay view</span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-6 flex justify-center">
                    <svg
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      aria-hidden="true"
                      role="presentation"
                      focusable="false"
                    >
                      <path d="M28 2a2 2 0 0 1 2 2v24a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 2H4v24h24zM16 7a9 9 0 0 1 8.043 13H7.957A9 9 0 0 1 16 7zm0 2a7 7 0 0 0-6.591 9h13.182A7 7 0 0 0 16 9zm-7 11h14v2H9zm10 4h4v2h-4z"></path>
                    </svg>
                  </div>
                  <span>Sea view</span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-6 flex justify-center">
                    <svg
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      aria-hidden="true"
                      role="presentation"
                      focusable="false"
                    >
                      <path d="m15.9999 20.33323c2.0250459 0 3.66667 1.6416241 3.66667 3.66667s-1.6416241 3.66667-3.66667 3.66667-3.66667-1.6416241-3.66667-3.66667 1.6416241-3.66667 3.66667-3.66667zm0 2c-.9204764 0-1.66667.7461936-1.66667 1.66667s.7461936 1.66667 1.66667 1.66667 1.66667-.7461936 1.66667-1.66667-.7461936-1.66667-1.66667-1.66667zm.0001-7.33323c3.5168171 0 6.5625093 2.0171251 8.0432368 4.9575354l-1.5143264 1.5127043c-1.0142061-2.615688-3.5549814-4.4702397-6.5289104-4.4702397s-5.5147043 1.8545517-6.52891042 4.4702397l-1.51382132-1.5137072c1.48091492-2.939866 4.52631444-4.9565325 8.04273174-4.9565325zm.0001-5.3332c4.9804693 0 9.3676401 2.540213 11.9365919 6.3957185l-1.4470949 1.4473863c-2.1746764-3.5072732-6.0593053-5.8431048-10.489497-5.8431048s-8.31482064 2.3358316-10.48949703 5.8431048l-1.44709488-1.4473863c2.56895177-3.8555055 6.95612261-6.3957185 11.93659191-6.3957185zm-.0002-5.3336c6.4510616 0 12.1766693 3.10603731 15.7629187 7.9042075l-1.4304978 1.4309874c-3.2086497-4.44342277-8.4328305-7.3351949-14.3324209-7.3351949-5.8991465 0-11.12298511 2.89133703-14.33169668 7.334192l-1.43047422-1.4309849c3.58629751-4.79760153 9.31155768-7.9032071 15.7621709-7.9032071z"></path>
                    </svg>
                  </div>
                  <span>Wifi</span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-6 flex justify-center">
                    <svg
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      aria-hidden="true"
                      role="presentation"
                      focusable="false"
                    >
                      <path d="M26 19a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 18a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm20.693-5l.42 1.119C29.253 15.036 30 16.426 30 18v9c0 1.103-.897 2-2 2h-2c-1.103 0-2-.897-2-2v-2H8v2c0 1.103-.897 2-2 2H4c-1.103 0-2-.897-2-2v-9c0-1.575.746-2.965 1.888-3.882L4.308 13H2v-2h3v.152l1.82-4.854A2.009 2.009 0 0 1 8.693 5h14.614c.829 0 1.58.521 1.873 1.297L27 11.151V11h3v2h-2.307zM6 25H4v2h2v-2zm22 0h-2v2h2v-2zm0-2v-5c0-1.654-1.346-3-3-3H7c-1.654 0-3 1.346-3 3v5h24zm-3-10h.557l-2.25-6H8.693l-2.25 6H25zm-15 7h-2v-2h2v2zm12 0h-2v-2h2v2z"></path>
                    </svg>
                  </div>
                  <span>Free parking on premises</span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-6 flex justify-center">
                    <svg
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      aria-hidden="true"
                      role="presentation"
                      focusable="false"
                    >
                      <path d="M16 2a5 5 0 0 1 5 5 5 5 0 0 1 0 10 5.002 5.002 0 0 1-4 4.9v4.287C18.652 23.224 21.153 22 23.95 22a8.94 8.94 0 0 1 3.737.814l.313.15.002 2.328A6.963 6.963 0 0 0 23.95 24c-3.542 0-6.453 2.489-6.93 5.869l-.02.15-.006.098a1 1 0 0 1-.876.876L16 31a1 1 0 0 1-.974-.77l-.02-.124C14.635 26.623 11.615 24 7.972 24a6.963 6.963 0 0 0-3.97 1.234l.002-2.314c1.218-.6 2.57-.92 3.968-.92 2.818 0 5.358 1.24 7.028 3.224V21.9a5.002 5.002 0 0 1-3.995-4.683L11 17l-.217-.005a5 5 0 0 1 0-9.99L11 7l.005-.217A5 5 0 0 1 16 2zm2.864 14.1c-.811.567-1.799.9-2.864.9s-2.053-.333-2.864-.9l-.062.232a3 3 0 0 0 5.851.001zM11 14a3.001 3.001 0 0 0-2.995 2.824L8 17l.005.176A3.001 3.001 0 0 0 11 20c.617 0 1.185-.186 1.662-.5l.162-.117.16-.13c.558-.497.943-1.162 1.01-1.917l.006-.19L14 17a3.001 3.001 0 0 0-3-3zm10 0a3.001 3.001 0 0 0-2.995 2.824L18 17l.005.176A3.001 3.001 0 0 0 21 20c.617 0 1.185-.186 1.662-.5l.162-.117.16-.13c.558-.497.943-1.162 1.01-1.917l.006-.19L24 17a3.001 3.001 0 0 0-3-3zm-5-10a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"></path>
                    </svg>
                  </div>
                  <span>Luggage dropoff allowed</span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-6 flex justify-center">
                    <svg
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      aria-hidden="true"
                      role="presentation"
                      focusable="false"
                    >
                      <path d="M14 27l-.005.2a4 4 0 0 1-3.789 3.795L10 31H4v-2h6l.15-.005a2 2 0 0 0 1.844-1.838L12 27zM10 1c.536 0 1.067.047 1.58.138l.38.077 17.448 3.64a2 2 0 0 1 1.585 1.792l.007.166v6.374a2 2 0 0 1-1.431 1.917l-.16.04-13.554 2.826 1.767 6.506a2 2 0 0 1-1.753 2.516l-.177.008H11.76a2 2 0 0 1-1.879-1.315l-.048-.15-1.88-6.99A9 9 0 0 1 10 1zm5.692 24l-1.799-6.621-1.806.378a8.998 8.998 0 0 1-1.663.233l-.331.008L11.76 25zM10 3a7 7 0 1 0 1.32 13.875l.331-.07L29 13.187V6.813L11.538 3.169A7.027 7.027 0 0 0 10 3zm0 2a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"></path>
                    </svg>
                  </div>
                  <span>Hair dryer</span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-6 flex justify-center">
                    <svg
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      aria-hidden="true"
                      role="presentation"
                      focusable="false"
                    >
                      <path d="M29 3a2 2 0 0 1 1.995 1.85L31 5v22a2 2 0 0 1-1.85 1.995L29 29H3a2 2 0 0 1-1.995-1.85L1 27V5a2 2 0 0 1 1.85-1.995L3 3zm0 2H3v22h26zm-6 2v18H5V7zm-2 2H7v14h14zM18 1v2h-4V1z"></path>
                    </svg>
                  </div>
                  <span>Microwave</span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-6 flex justify-center">
                    <svg
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      aria-hidden="true"
                      role="presentation"
                      focusable="false"
                    >
                      <path d="M16 1a15 15 0 1 1 0 30 15 15 0 0 1 0-30zm0 2a13 13 0 1 0 0 26 13 13 0 0 0 0-26zm-4.9 14a5 5 0 0 0 3.9 3.9v2.03A7.001 7.001 0 0 1 9.1 17zm9.8 0h2.03a7.001 7.001 0 0 1-5.9 5.9v-2.03a5 5 0 0 0 3.87-3.87zM11.1 11A5 5 0 0 0 7.2 14.9H5.17A7.001 7.001 0 0 1 11.1 9zm9.8 0v2.03a5 5 0 0 0-3.9 3.87h-2.03a7.001 7.001 0 0 1 5.93-5.9z"></path>
                    </svg>
                  </div>
                  <span>Breakfast</span>
                </div>

                <div className="flex items-center gap-4 text-muted-foreground line-through">
                  <div className="w-6 flex justify-center">
                    <svg
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      aria-hidden="true"
                      role="presentation"
                      focusable="false"
                    >
                      <path d="M25 2a5 5 0 0 1 5 5v16a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2H7a3 3 0 0 0-3 3v16a3 3 0 0 0 3 3h18a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-9 5a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"></path>
                    </svg>
                  </div>
                  <span>Carbon monoxide alarm</span>
                </div>
              </div>

              <Button variant="outline" className="mt-6">
                Show all 29 amenities
              </Button>
            </div>

            <Separator className="my-6" />

            {/* 5 nights in Imabari */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">
                5 nights in Imabari
              </h2>
              <p className="text-muted-foreground mb-6">
                Jul 6, 2025 - Jul 11, 2025
              </p>

              <div className="flex items-center justify-between">
                <Button variant="ghost" size="icon">
                  <svg
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    aria-hidden="true"
                    role="presentation"
                    focusable="false"
                  >
                    <path d="M20 28.667V5.667h-2v23a1 1 0 1 1-2 0v-23h-2v23a1 1 0 1 1-2 0v-23h-2v23a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-23H5v23a3 3 0 0 0 3 3h11a3 3 0 0 0 3-3v-23h-2z"></path>
                  </svg>
                </Button>
                <div className="text-center">
                  <div className="font-semibold">July 2025</div>
                </div>
                <Button variant="ghost" size="icon">
                  <svg
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    aria-hidden="true"
                    role="presentation"
                    focusable="false"
                  >
                    <path d="m12 4 11.3 11.3a1 1 0 0 1 0 1.4L12 28l-1.4-1.4 10.6-10.6L10.6 5.4z"></path>
                  </svg>
                </Button>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Reviews Section */}
            <Separator className="my-6" />

            <div className="mb-10">
              <div className="flex flex-col items-center text-center mb-8">
                <div className="relative">
                  <div className="text-6xl font-bold mb-2">4.98</div>
                  <div className="absolute -left-14 top-4">
                    <span className="text-yellow-500 text-4xl">🏆</span>
                  </div>
                  <div className="absolute -right-14 top-4">
                    <span className="text-yellow-500 text-4xl">🏆</span>
                  </div>
                </div>
                <div className="font-semibold text-lg mb-1">Guest favorite</div>
                <p className="text-sm text-muted-foreground max-w-md">
                  This home is in the top 5% of eligible listings based on
                  ratings, reviews, and reliability
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-10">
                <div className="flex flex-col items-center">
                  <div className="font-semibold mb-1">Overall rating</div>
                  <div className="w-full bg-gray-200 h-1 rounded-full">
                    <div className="bg-black h-1 rounded-full w-[99%]"></div>
                  </div>
                  <div className="flex justify-between w-full text-xs mt-1">
                    <span>1</span>
                    <span>5</span>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="font-semibold mb-1">Cleanliness</div>
                  <div className="text-lg">4.9</div>
                  <div className="text-gray-600">
                    <svg
                      viewBox="0 0 32 32"
                      className="w-6 h-6"
                      aria-hidden="true"
                    >
                      <path d="M16 1c8.284 0 15 6.716 15 15 0 8.284-6.716 15-15 15-8.284 0-15-6.716-15-15C1 7.716 7.716 1 16 1zm0 2C8.82 3 3 8.82 3 16s5.82 13 13 13 13-5.82 13-13S23.18 3 16 3zm-4.9 14a5.006 5.006 0 0 0 3.9 3.9v2.03A7.005 7.005 0 0 1 9.07 17zm9.8 0h2.03A7.005 7.005 0 0 1 17 22.93v-2.03a5.006 5.006 0 0 0 3.9-3.9zM11.1 11A5.006 5.006 0 0 0 7.2 14.9H5.17A7.005 7.005 0 0 1 11.1 9zm9.8 0v2.03a5.006 5.006 0 0 0-3.9 3.87h-2.03A7.005 7.005 0 0 1 20.9 11z"></path>
                    </svg>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="font-semibold mb-1">Accuracy</div>
                  <div className="text-lg">4.9</div>
                  <div className="text-gray-600">
                    <svg
                      viewBox="0 0 32 32"
                      className="w-6 h-6"
                      aria-hidden="true"
                    >
                      <path d="M16 1a15 15 0 1 1 0 30 15 15 0 0 1 0-30zm0 2a13 13 0 1 0 0 26 13 13 0 0 0 0-26zm6.54 6.06l-8.67 8.67-3.11-3.11a1 1 0 0 0-1.42 1.42l3.75 3.75a1.01 1.01 0 0 0 .71.29.998.998 0 0 0 .71-.29l9.33-9.33a1 1 0 0 0-1.42-1.42z"></path>
                    </svg>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="font-semibold mb-1">Check-in</div>
                  <div className="text-lg">5.0</div>
                  <div className="text-gray-600">
                    <svg
                      viewBox="0 0 32 32"
                      className="w-6 h-6"
                      aria-hidden="true"
                    >
                      <path d="M16 0a16 16 0 1 1 0 32 16 16 0 0 1 0-32zm0 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2zm0 20a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm0-10a2 2 0 0 0-2 2v6a2 2 0 1 0 4 0v-6a2 2 0 0 0-2-2z"></path>
                    </svg>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="font-semibold mb-1">Communication</div>
                  <div className="text-lg">5.0</div>
                  <div className="text-gray-600">
                    <svg
                      viewBox="0 0 32 32"
                      className="w-6 h-6"
                      aria-hidden="true"
                    >
                      <path d="M18 1v2H5v18H3V3a2 2 0 0 1 2-2zm8.455 3.04A3.953 3.953 0 0 0 29 8v10.5c0 1.38-.56 2.63-1.464 3.535A2.45 2.45 0 0 1 26 23.95a3.973 3.973 0 0 1-3.525-5.945 3.986 3.986 0 0 1 3.525-1.985H27v-8c0-.53-.21-1.04-.585-1.415A2 2 0 0 0 25 6H9a2 2 0 0 0-2 2v16c0 .53.21 1.04.585 1.415A2 2 0 0 0 9 26h12.5v2H9a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4h17.5c.22 0 .433.018.642.052.154.024.304.055.45.092l-.142-.104zM26 19.9a1.98 1.98 0 0 0-1.89.816 1.99 1.99 0 0 0 1.89 3.179 1.99 1.99 0 0 0 0-3.995z"></path>
                    </svg>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="font-semibold mb-1">Location</div>
                  <div className="text-lg">4.8</div>
                  <div className="text-gray-600">
                    <svg
                      viewBox="0 0 32 32"
                      className="w-6 h-6"
                      aria-hidden="true"
                    >
                      <path d="M16 0a12 12 0 0 1 12 12c0 6.34-3.81 12.75-11.35 19.35l-.65.56-1.08-.93C7.67 24.62 4 19.12 4 12A12 12 0 0 1 16 0zm0 2C9.94 2 5 6.94 5 12c0 5.76 3.33 10.72 9 16.46.62-.55 1.23-1.12 1.83-1.71l.57-.54A19.894 19.894 0 0 0 18.96 24h2.02c-.5.45-1.04.89-1.6 1.34-.48.38-.95.75-1.4 1.1C23.8 21.42 27 16.35 27 12c0-5.06-4.94-10-11-10zm0 5a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"></path>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Reviews List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Review 1 */}
                <div className="border-b pb-6 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                      <Image
                        src="/placeholder.svg?height=40&width=40"
                        alt="User"
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-semibold">知子</div>
                      <div className="text-sm text-muted-foreground">
                        3 months on Airbnb
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center text-sm mb-2">
                    <div className="flex">
                      <StarIcon className="h-3 w-3 fill-current" />
                      <StarIcon className="h-3 w-3 fill-current" />
                      <StarIcon className="h-3 w-3 fill-current" />
                      <StarIcon className="h-3 w-3 fill-current" />
                      <StarIcon className="h-3 w-3 fill-current" />
                    </div>
                    <span className="mx-2">·</span>
                    <span>5 days ago</span>
                    <span className="mx-2">·</span>
                    <span>Stayed a few nights</span>
                  </div>
                  <p className="text-sm">
                    It was a space without a TV and unusual, but I was satisfied
                    without any inconvenience. Everything is clean and tidy...
                  </p>
                  <Button variant="link" className="px-0 text-sm">
                    Show more
                  </Button>
                </div>

                {/* Review 2 */}
                <div className="border-b pb-6 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                      <Image
                        src="/placeholder.svg?height=40&width=40"
                        alt="User"
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-semibold">Britt</div>
                      <div className="text-sm text-muted-foreground">
                        9 years on Airbnb
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center text-sm mb-2">
                    <div className="flex">
                      <StarIcon className="h-3 w-3 fill-current" />
                      <StarIcon className="h-3 w-3 fill-current" />
                      <StarIcon className="h-3 w-3 fill-current" />
                      <StarIcon className="h-3 w-3 fill-current" />
                      <StarIcon className="h-3 w-3 fill-current" />
                    </div>
                    <span className="mx-2">·</span>
                    <span>1 week ago</span>
                    <span className="mx-2">·</span>
                    <span>Stayed a few nights</span>
                  </div>
                  <p className="text-sm">
                    We had a lovely 2-nights stay! It is in a beautiful area,
                    easily accessible by car. All facilities, and specifically
                    the bathroom, were perfectly maintained. Thank you Olivier
                    for our stay...
                  </p>
                  <Button variant="link" className="px-0 text-sm">
                    Show more
                  </Button>
                </div>

                {/* Review 3 */}
                <div className="border-b pb-6 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                      <Image
                        src="/placeholder.svg?height=40&width=40"
                        alt="User"
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-semibold">Glen</div>
                      <div className="text-sm text-muted-foreground">
                        5 years on Airbnb
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center text-sm mb-2">
                    <div className="flex">
                      <StarIcon className="h-3 w-3 fill-current" />
                      <StarIcon className="h-3 w-3 fill-current" />
                      <StarIcon className="h-3 w-3 fill-current" />
                      <StarIcon className="h-3 w-3 fill-current" />
                      <StarIcon className="h-3 w-3 fill-current" />
                    </div>
                    <span className="mx-2">·</span>
                    <span>2 weeks ago</span>
                    <span className="mx-2">·</span>
                    <span>Stayed one night</span>
                  </div>
                  <p className="text-sm">
                    Idyllic location with sea views. Romantic refurbished
                    traditional Japanese house with tatami room. Lovely host
                    family with whom we shared breakfast prepared by...
                  </p>
                  <Button variant="link" className="px-0 text-sm">
                    Show more
                  </Button>
                </div>

                {/* Review 4 */}
                <div className="border-b pb-6 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                      <Image
                        src="/placeholder.svg?height=40&width=40"
                        alt="User"
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-semibold">Rik</div>
                      <div className="text-sm text-muted-foreground">
                        8 years on Airbnb
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center text-sm mb-2">
                    <div className="flex">
                      <StarIcon className="h-3 w-3 fill-current" />
                      <StarIcon className="h-3 w-3 fill-current" />
                      <StarIcon className="h-3 w-3 fill-current" />
                      <StarIcon className="h-3 w-3 fill-current" />
                      <StarIcon className="h-3 w-3 fill-current" />
                    </div>
                    <span className="mx-2">·</span>
                    <span>2 weeks ago</span>
                    <span className="mx-2">·</span>
                    <span>Stayed one night</span>
                  </div>
                  <p className="text-sm">
                    Beautiful cosy place with great view. We loved staying here
                    after a long day of cycling the Shimanami Kaido. Olivier and
                    his wife were very kind and helpful. The breakfast with
                    local...
                  </p>
                  <Button variant="link" className="px-0 text-sm">
                    Show more
                  </Button>
                </div>
              </div>
            </div>

            {/* Things to know section */}
            <Separator className="my-6" />

            <div className="mb-10">
              <h2 className="text-xl font-semibold mb-6">Things to know</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="font-semibold mb-4">House rules</h3>
                  <ul className="space-y-4">
                    <li>
                      <div>Check-in: 2:00 PM - 7:00 PM</div>
                    </li>
                    <li>
                      <div>Checkout before 11:00 AM</div>
                    </li>
                    <li>
                      <div>3 guests maximum</div>
                    </li>
                  </ul>
                  <Button
                    variant="link"
                    className="px-0 mt-2 text-sm flex items-center"
                  >
                    Show more
                    <svg
                      viewBox="0 0 18 18"
                      className="w-3 h-3 ml-2"
                      aria-hidden="true"
                    >
                      <path d="m4.29 1.71a1 1 0 1 1 1.42-1.42l8 8a1 1 0 0 1 0 1.42l-8 8a1 1 0 1 1 -1.42-1.42l7.29-7.29z"></path>
                    </svg>
                  </Button>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Safety & property</h3>
                  <ul className="space-y-4">
                    <li>
                      <div>Carbon monoxide alarm not reported</div>
                    </li>
                    <li>
                      <div>Smoke alarm</div>
                    </li>
                    <li>
                      <div>Some spaces are shared</div>
                    </li>
                  </ul>
                  <Button
                    variant="link"
                    className="px-0 mt-2 text-sm flex items-center"
                  >
                    Show more
                    <svg
                      viewBox="0 0 18 18"
                      className="w-3 h-3 ml-2"
                      aria-hidden="true"
                    >
                      <path d="m4.29 1.71a1 1 0 1 1 1.42-1.42l8 8a1 1 0 0 1 0 1.42l-8 8a1 1 0 1 1 -1.42-1.42l7.29-7.29z"></path>
                    </svg>
                  </Button>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Cancellation policy</h3>
                  <div className="space-y-4">
                    <p>
                      Free cancellation before Jul 5. Cancel before check-in on
                      Jul 6 for a partial refund.
                    </p>
                    <p>Review this Host&apos;s full policy for details.</p>
                  </div>
                  <Button
                    variant="link"
                    className="px-0 mt-2 text-sm flex items-center"
                  >
                    Show more
                    <svg
                      viewBox="0 0 18 18"
                      className="w-3 h-3 ml-2"
                      aria-hidden="true"
                    >
                      <path d="m4.29 1.71a1 1 0 1 1 1.42-1.42l8 8a1 1 0 0 1 0 1.42l-8 8a1 1 0 1 1 -1.42-1.42l7.29-7.29z"></path>
                    </svg>
                  </Button>
                </div>
              </div>
            </div>

            {/* More details would go here */}
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <div className="border rounded-xl p-6 shadow-lg sticky top-24">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-2xl font-bold">¥2,060,935</span>
                  <span className="text-muted-foreground"> night</span>
                </div>
                <div className="flex items-center">
                  <StarIcon className="h-4 w-4 fill-current" />
                  <span className="ml-1 font-medium">4.98</span>
                  <span className="mx-1 text-muted-foreground">·</span>
                  <span className="text-muted-foreground underline">
                    136 reviews
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 border rounded-t-lg overflow-hidden mb-4">
                <div className="p-3 border-r border-b">
                  <div className="text-xs font-semibold">CHECK-IN</div>
                  <div>7/6/2025</div>
                </div>
                <div className="p-3 border-b">
                  <div className="text-xs font-semibold">CHECKOUT</div>
                  <div>7/11/2025</div>
                </div>
                <div className="p-3 col-span-2 flex justify-between items-center">
                  <div>
                    <div className="text-xs font-semibold">GUESTS</div>
                    <div>1 guest</div>
                  </div>
                  <ChevronDownIcon className="h-5 w-5" />
                </div>
              </div>

              <Button className="w-full mb-4 bg-rose-500 hover:bg-rose-600 text-white">
                Reserve
              </Button>
              <p className="text-center text-sm text-muted-foreground mb-6">
                You won&apos;t be charged yet
              </p>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="underline">¥2,060,935 x 5 nights</span>
                  <span>¥10,304,675</span>
                </div>
                <div className="flex justify-between">
                  <span className="underline">Cleaning fee</span>
                  <span>¥448,029</span>
                </div>
                <div className="flex justify-between">
                  <span className="underline">Airbnb service fee</span>
                  <span>¥1,518,102</span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between font-bold">
                <span>Total before taxes</span>
                <span>¥12,270,806</span>
              </div>

              {/* Good price section */}
              <div className="mt-6 p-4 border rounded-lg flex gap-3">
                <div className="text-rose-500">
                  <svg
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 fill-current"
                    aria-hidden="true"
                    role="presentation"
                    focusable="false"
                  >
                    <path
                      d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div>
                  <div className="font-semibold">Good price</div>
                  <div className="text-sm text-muted-foreground">
                    Your dates are ¥858,691 less than the avg. nightly rate over
                    the last 3 months.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 mt-10 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:underline">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:underline">
                    Get help with a safety issue
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:underline">
                    AirCover
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:underline">
                    Anti-discrimination
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:underline">
                    Disability support
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:underline">
                    Cancellation options
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:underline">
                    Report neighborhood concern
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Hosting</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:underline">
                    Airbnb your home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:underline">
                    AirCover for Hosts
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:underline">
                    Hosting resources
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:underline">
                    Community forum
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:underline">
                    Hosting responsibly
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:underline">
                    Airbnb-friendly apartments
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:underline">
                    Join a free Hosting class
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:underline">
                    Find a co-host
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Airbnb</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:underline">
                    Newsroom
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:underline">
                    New features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:underline">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:underline">
                    Investors
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:underline">
                    Gift cards
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:underline">
                    Airbnb.org emergency stays
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row items-center gap-2 mb-4 md:mb-0">
              <span className="text-sm">© 2025 Airbnb, Inc.</span>
              <span className="hidden md:inline">·</span>
              <a href="#" className="text-sm hover:underline">
                Terms
              </a>
              <span className="hidden md:inline">·</span>
              <a href="#" className="text-sm hover:underline">
                Sitemap
              </a>
              <span className="hidden md:inline">·</span>
              <a href="#" className="text-sm hover:underline">
                Privacy
              </a>
              <span className="hidden md:inline">·</span>
              <a href="#" className="text-sm hover:underline">
                Your Privacy Choices
              </a>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="rounded-full">
                <svg
                  viewBox="0 0 16 16"
                  className="w-5 h-5 mr-2"
                  aria-hidden="true"
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm-.245 14.848a6.92 6.92 0 0 1-4.603-1.743l.65-.376L5.6 9.457l.015-.003a.664.664 0 0 1 .644.401l.01.024 1.251 2.718.371.13a3.468 3.468 0 0 0 1.339.454c-.16-.004-.322-.013-.484-.03zm5.847-1.752A6.922 6.922 0 0 1 8.867 15h-.933a.703.703 0 0 1-.582-.317l-1.174-2.7-.01-.024a.664.664 0 0 0-.644-.401l-.015.003-1.8 3.272-.65.376A6.913 6.913 0 0 1 1.058 9.48a3.484 3.484 0 0 0 .893 2.371 3.494 3.494 0 0 0 2.371.893c.466 0 .916-.09 1.339-.254l-.37-.13L4.04 9.643a.703.703 0 0 1 .317-.582l2.7-1.174v-2.61a.703.703 0 0 1 .582-.317l2.7 1.175c.248.107.425.34.465.605h.003L11.63 9H15a7 7 0 0 0-1.398-4.25V4h-.002A6.979 6.979 0 0 0 8 1a6.98 6.98 0 0 0-5.187 2.282 6.986 6.986 0 0 0-1.82 4.732 7.026 7.026 0 0 0 .175 1.535c.136.612.36 1.19.654 1.726.034.062.07.122.106.182a6.928 6.928 0 0 0 .989 1.238 6.978 6.978 0 0 0 3.944 1.922.664.664 0 0 0-.054-.146c-.02-.047-.044-.092-.07-.136l-.835-1.819a3.474 3.474 0 0 0-2.371-.893 3.484 3.484 0 0 0-2.371.893 3.494 3.494 0 0 0-.893 2.371c0 .466.09.916.254 1.339l.13-.371v-.005a.703.703 0 0 1 .582-.317h2.61l1.174-2.7a.692.692 0 0 1 .582-.318h.006V9.624a.709.709 0 0 1-.588-.316l-1.175-2.7a.703.703 0 0 1 .317-.582h2.61V3.614a.703.703 0 0 1 .318-.582h.005l2.7 1.175c.156.068.287.188.37.341.028.051.05.106.067.164l.006.026a.665.665 0 0 1-.14.543 3.469 3.469 0 0 0-.893 2.371 3.484 3.484 0 0 0 .893 2.371 3.494 3.494 0 0 0 2.371.893c.466 0 .916-.09 1.339-.254zm-9.468-5.848a.703.703 0 0 1-.317.582l-2.7 1.175V11.01a.703.703 0 0 1-.582.317l-2.7-1.174a.692.692 0 0 1-.37-.588.703.703 0 0 1 .37-.588l2.7-1.174V6.196a.703.703 0 0 1 .582-.317l2.7 1.175a.692.692 0 0 1 .317.582z"></path>
                </svg>
                English (US)
              </Button>
              <Button variant="ghost" size="sm">
                $ VND
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <svg viewBox="0 0 32 32" className="w-5 h-5" aria-hidden="true">
                  <path d="M16 .8C7.6.8.8 7.6.8 16s6.8 15.2 15.2 15.2S31.2 24.4 31.2 16 24.4.8 16 .8zm0 28c-7.1 0-12.8-5.7-12.8-12.8S8.9 3.2 16 3.2 28.8 8.9 28.8 16 23.1 28.8 16 28.8zM18.4 16c0 1.3-1.1 2.4-2.4 2.4s-2.4-1.1-2.4-2.4 1.1-2.4 2.4-2.4 2.4 1.1 2.4 2.4zm-9.6 0c0 1.3-1.1 2.4-2.4 2.4S4 17.3 4 16s1.1-2.4 2.4-2.4 2.4 1.1 2.4 2.4zm19.2 0c0 1.3-1.1 2.4-2.4 2.4S23.2 17.3 23.2 16s1.1-2.4 2.4-2.4 2.4 1.1 2.4 2.4z"></path>
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
