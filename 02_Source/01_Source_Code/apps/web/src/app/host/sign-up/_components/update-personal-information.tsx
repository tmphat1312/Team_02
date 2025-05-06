import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function UpdatePersonalInformation() {
  return (
    <Card className="gap-3 w-lg">
      <CardHeader className="mb-3">
        <CardTitle className="mb-2 text-3xl">
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
          className="bg-secondary px-4 py-2 rounded-lg w-full text-secondary-foreground text-base"
        >
          Update your personal information
        </Link>
      </CardContent>
    </Card>
  );
}
