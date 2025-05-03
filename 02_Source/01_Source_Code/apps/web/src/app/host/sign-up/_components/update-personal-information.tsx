import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export function UpdatePersonalInformation() {
  return (
    <Card className="w-lg gap-3">
      <CardHeader className="mb-3">
        <CardTitle className="text-3xl mb-2">
          Update your personal information
        </CardTitle>
        <CardDescription>
          You must update your personal information to become a host. Please
          update your personal information to proceed.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Link
          href="/account"
          className="w-full bg-secondary text-secondary-foreground px-4 py-2 rounded text-lg"
        >
          Update your personal information
        </Link>
      </CardContent>
    </Card>
  );
}
