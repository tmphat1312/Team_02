"use client";

import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function VerifyEmailForm() {
  return (
    <Card className="gap-3 w-lg">
      <CardHeader className="mb-3">
        <CardTitle className="mb-2 text-3xl">Verify your email</CardTitle>
        <CardDescription>
          Your email address is not verified, which prevents you from becoming a
          host. Please verify your email address to proceed.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Link
          href="/account"
          className="bg-secondary px-4 py-2 rounded-lg w-full text-secondary-foreground text-base"
        >
          Go to Account Page to verify your email
        </Link>
      </CardContent>
    </Card>
  );
}
