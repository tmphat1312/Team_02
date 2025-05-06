import { Stack } from "@/components/layout/stack";
import { PageSubHeading } from "@/components/typography/page-sub-heading";
import { TextAlert } from "@/components/typography/text-alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export function HostDetails() {
  return (
    <section>
      <PageSubHeading>Meet your host</PageSubHeading>
      <Stack className="flex-wrap gap-16">
        <Stack className="shadow-lg p-8 border border-border/50 rounded-lg">
          <section className="flex flex-col items-center px-12">
            <Avatar className="size-24">
              <AvatarImage
                src="https://avatar.iran.liara.run/public"
                alt="Fred"
              />
              <AvatarFallback>
                <Skeleton className="rounded-full size-full" />
              </AvatarFallback>
            </Avatar>
            <h3 className="font-bold text-3xl">Fred</h3>
            <TextAlert>Host</TextAlert>
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
        </Stack>

        <section className="grow">
          <h3 className="mb-4 font-medium text-xl">Host details</h3>
          <div className="mb-6">
            <div>Response rate: N/A</div>
            <div>Response within few hours</div>
          </div>
          <Button size="lg" variant="secondary" className="text-base">
            Message host
          </Button>
          <Separator className="my-5" />
          <TextAlert>
            To help protect your payment, always use Airbnb to send money and
            communicate with hosts.
          </TextAlert>
        </section>
      </Stack>
    </section>
  );
}
