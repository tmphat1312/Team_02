import { Accuracy } from "@/components/icons/accuracy";
import { Cleanliness } from "@/components/icons/cleanliness";
import { Communication } from "@/components/icons/communication";
import { Location } from "@/components/icons/location";
import { Separator } from "@/components/ui/separator";
import { Star } from "lucide-react";

const mockData = {
  noReviews: 40,
  averageReview: 4.8,
  cleanliness: 5.0,
  accuracy: 4.6,
  communication: 4.5,
  location: 4.0,
};

export function PropertyReviews() {
  return (
    <div>
      <section className="mb-5">
        <h3 className="text-2xl font-semibold flex items-center gap-2">
          <Star className="fill-current" size={24} />
          <span>{mockData.averageReview}</span>
          <span>·</span>
          <span>{mockData.noReviews} reviews</span>
        </h3>
      </section>

      <div className="grid grid-cols-5 gap-8 divide-x-2 divide-black/10">
        <section className="pe-8">
          <h4 className="mb-2 font-medium">Overall rating</h4>
          <div className="text-xs">
            <div className="flex items-center gap-2">
              <span>5</span>
              <span className="h-1 w-full rounded bg-black/80" />
            </div>
            <div className="flex items-center gap-2">
              <span>4</span>
              <span className="h-1 w-full rounded bg-black/20" />
            </div>
            <div className="flex items-center gap-2">
              <span>3</span>
              <span className="h-1 w-full rounded bg-black/20" />
            </div>
            <div className="flex items-center gap-2">
              <span>2</span>
              <span className="h-1 w-full rounded bg-black/20" />
            </div>
            <div className="flex items-center gap-2">
              <span>1</span>
              <span className="h-1 w-full rounded bg-black/20" />
            </div>
          </div>
        </section>
        <section>
          <h4 className="mb-1 font-medium">Cleanliness</h4>
          <div className="flex flex-col gap-3.5">
            <span className="text-xl font-medium">
              {mockData.cleanliness.toFixed(1)}
            </span>
            <Cleanliness className="size-8" />
          </div>
        </section>
        <section>
          <h4 className="mb-1 font-medium">Accuracy</h4>
          <div className="flex flex-col gap-3.5">
            <span className="text-xl font-medium">
              {mockData.accuracy.toFixed(1)}
            </span>
            <Accuracy className="size-8" />
          </div>
        </section>
        <section>
          <h4 className="mb-1 font-medium">Communication</h4>
          <div className="flex flex-col gap-3.5">
            <span className="text-xl font-medium">
              {mockData.communication.toFixed(1)}
            </span>
            <Communication className="size-8" />
          </div>
        </section>
        <section>
          <h4 className="mb-1 font-medium">Location</h4>
          <div className="flex flex-col gap-3.5">
            <span className="text-xl font-medium">
              {mockData.location.toFixed(1)}
            </span>
            <Location className="size-8" />
          </div>
        </section>
      </div>

      <Separator className="my-8" />

      <div className="space-y-8">
        <div className="grid grid-cols-2 gap-12">
          <article>
            <section className="flex items-center gap-4 mb-3.5">
              <div className="size-12 rounded-full bg-gray-200" />
              <div>
                <h5 className="font-medium">Noorin</h5>
                <p>12 years on Airbnb</p>
              </div>
            </section>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                <Star className="fill-current" size={10} />
                <Star className="fill-current" size={10} />
                <Star className="fill-current" size={10} />
                <Star className="fill-current" size={10} />
                <Star className="fill-current" size={10} />
                <Star className="fill-current" size={10} />
              </div>
              <span>· January 2025</span>
            </div>
            <section>
              <p>
                Fred’s place is a little piece of heaven. Along with his team,
                they have created something truly wonderful. The food and
                service was outstanding, and the snorkelling was great, we...
              </p>
              <button className="underline">Show more</button>
            </section>
          </article>
          <article>
            <section className="flex items-center gap-4 mb-3.5">
              <div className="size-12 rounded-full bg-gray-200" />
              <div>
                <h5 className="font-medium">Noorin</h5>
                <p>12 years on Airbnb</p>
              </div>
            </section>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                <Star className="fill-current" size={10} />
                <Star className="fill-current" size={10} />
                <Star className="fill-current" size={10} />
                <Star className="fill-current" size={10} />
                <Star className="fill-current" size={10} />
                <Star className="fill-current" size={10} />
              </div>
              <span>· January 2025</span>
            </div>
            <section>
              <p>
                Fred’s place is a little piece of heaven. Along with his team,
                they have created something truly wonderful. The food and
                service was outstanding, and the snorkelling was great, we...
              </p>
              <button className="underline">Show more</button>
            </section>
          </article>
          <article>
            <section className="flex items-center gap-4 mb-3.5">
              <div className="size-12 rounded-full bg-gray-200" />
              <div>
                <h5 className="font-medium">Noorin</h5>
                <p>12 years on Airbnb</p>
              </div>
            </section>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                <Star className="fill-current" size={10} />
                <Star className="fill-current" size={10} />
                <Star className="fill-current" size={10} />
                <Star className="fill-current" size={10} />
                <Star className="fill-current" size={10} />
                <Star className="fill-current" size={10} />
              </div>
              <span>· January 2025</span>
            </div>
            <section>
              <p>
                Fred’s place is a little piece of heaven. Along with his team,
                they have created something truly wonderful. The food and
                service was outstanding, and the snorkelling was great, we...
              </p>
              <button className="underline">Show more</button>
            </section>
          </article>
          <article>
            <section className="flex items-center gap-4 mb-3.5">
              <div className="size-12 rounded-full bg-gray-200" />
              <div>
                <h5 className="font-medium">Noorin</h5>
                <p>12 years on Airbnb</p>
              </div>
            </section>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                <Star className="fill-current" size={10} />
                <Star className="fill-current" size={10} />
                <Star className="fill-current" size={10} />
                <Star className="fill-current" size={10} />
                <Star className="fill-current" size={10} />
                <Star className="fill-current" size={10} />
              </div>
              <span>· January 2025</span>
            </div>
            <section>
              <p>
                Fred’s place is a little piece of heaven. Along with his team,
                they have created something truly wonderful. The food and
                service was outstanding, and the snorkelling was great, we...
              </p>
              <button className="underline">Show more</button>
            </section>
          </article>
        </div>
        <button className="flex mx-auto underline">show more</button>
      </div>
    </div>
  );
}
