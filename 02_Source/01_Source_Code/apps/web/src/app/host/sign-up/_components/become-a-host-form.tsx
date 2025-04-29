import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function BecomeAHostForm() {
  return (
    <Card className="w-lg">
      <CardHeader>
        <CardTitle className="text-3xl mb-2">Become a Host</CardTitle>
        <CardDescription>
          Becoming a host enables you to list your property and manage bookings
          directly on our platform.
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent>
        <section>
          <h2 className="text-xl font-medium mb-3 text-center">
            Click the button below to become a host
          </h2>
          <Button
            type="submit"
            className="w-full "
            variant={"secondary"}
            size={"lg"}
          >
            Become a host
          </Button>
        </section>
      </CardContent>
    </Card>
  );
}
