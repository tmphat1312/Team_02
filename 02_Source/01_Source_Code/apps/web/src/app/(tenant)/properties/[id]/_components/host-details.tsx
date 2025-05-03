import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function HostDetails() {
  return (
    <section>
      <h3 className="text-2xl font-semibold mb-6">Meet your host</h3>
      <div className="flex gap-16 flex-wrap">
        <div className="shadow-xl border border-border/20 rounded-lg p-8 flex items-center mx-auto">
          <section className="flex flex-col items-center px-12">
            <div className="size-24 bg-gray-200 rounded-full mb-2" />
            <h4 className="text-3xl font-bold">Fred</h4>
            <p>Host</p>
          </section>
          <div className="divide-y-1">
            <div className="pb-2">
              <div className="font-semibold text-x2">5</div>
              <div className="text-sm">Reviews</div>
            </div>
            <div className="py-2">
              <div className="font-semibold text-x2">4.8</div>
              <div className="text-sm">Ratings</div>
            </div>
            <div className="py-2">
              <div className="font-semibold text-x2">12</div>
              <div className="text-sm">Months Hosting</div>
            </div>
          </div>
        </div>
        <section>
          <h4 className="text-xl font-medium mb-4">Host details</h4>
          <div className="mb-6">
            <div>Response rate: N/A</div>
            <div>Response within few hours</div>
          </div>
          <Button size="lg" className="text-white bg-black/90 text-base">
            Message host
          </Button>
          <Separator className="my-5" />
          <p className="text-sm">
            To help protect your payment, always use Airbnb to send money and
            communicate with hosts.
          </p>
        </section>
      </div>
    </section>
  );
}
