import { User } from "@/app/typings/models";
import { Stack } from "@/components/layout/stack";
import { PageSubHeading } from "@/components/typography/page-sub-heading";
import { TextAlert } from "@/components/typography/text-alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { calculateRelativeTime } from "@/lib/utils";

type HostDetailsProps = {
  host: User;
};

export function HostDetails({ host }: HostDetailsProps) {
  return (
    <section>
      <PageSubHeading>Meet your host</PageSubHeading>
      <Stack className="flex-wrap gap-16">
        <Stack className="shadow-lg p-8 border border-border/50 rounded-lg">
          <section className="flex flex-col items-center px-12">
            <Avatar className="size-24 mb-1">
              <AvatarImage src={host.image ?? undefined} alt={host.name} />
              <AvatarFallback>{host.name.at(0)}</AvatarFallback>
            </Avatar>
            <h3 className="font-bold text-2xl">{host.name}</h3>
            <TextAlert>Host</TextAlert>
          </section>
        </Stack>

        <section className="grow">
          <h3 className="mb-4 font-medium text-xl">Host details</h3>
          <div className="mb-6">
            <div>
              {calculateRelativeTime(new Date(host.createdAt))} of hosting
            </div>
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
