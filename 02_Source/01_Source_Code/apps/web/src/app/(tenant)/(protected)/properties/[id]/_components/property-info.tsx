import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const mockData = {
  rentalType: "Entire bungalow",
  location: "El Nido, Philippines",
  noGuests: 2,
  noBeds: 2,
  noBathrooms: 2,
  noBedrooms: 2,
  averageReview: 4.9,
  noReviews: 40,
};

export function PropertyInfo() {
  return (
    <div>
      <section className="mb-6">
        <h2 className="text-xl font-semibold">
          <span>{mockData.rentalType}</span>
          <span> in </span>
          <span>{mockData.location}</span>
        </h2>
        <p className="text-muted-foreground mb-3">
          <span>{mockData.noGuests} guests · </span>
          <span>{mockData.noBedrooms} bedrooms · </span>
          <span>{mockData.noBeds} beds · </span>
          <span>{mockData.noBathrooms} baths</span>
        </p>
        <p className="flex items-center gap-2 text-lg font-medium">
          <span className="inline-flex items-center gap-1">
            <Star className="fill-current" size={20} /> {mockData.averageReview}
          </span>
          <span>·</span>
          <span className="underline">{mockData.noReviews} reviews</span>
        </p>
      </section>

      <Separator className="my-6" />

      <section className="flex gap-4 items-center">
        <div className="size-10 rounded-full bg-gray-300" />
        <div>
          <h3>Hosted by</h3>
          <p>11 months ago</p>
        </div>
      </section>

      <Separator className="my-6" />

      <div className="prose max-w-none mb-6">
        <p>
          Experience traditional Japanese farm life in this charming private
          room. Nestled in the beautiful countryside of Imabari, our auberge
          offers a peaceful retreat with stunning views of the surrounding
          mountains and sea.
        </p>
        <p>
          The room features traditional tatami flooring and comfortable futon
          bedding. Guests have access to a private bathroom and shared common
          areas. Wake up to a delicious homemade breakfast featuring local
          ingredients from our farm.
        </p>

        <button>show more</button>
      </div>

      <Separator className="my-6" />

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-6">What this place offers</h2>

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
      </section>
    </div>
  );
}
