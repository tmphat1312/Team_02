"use client";

import { Stack } from "@/components/layout/stack";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { useUser } from "@/features/auth/hooks/use-user";

export function ProfileCard() {
  const { user } = useUser();

  if (!user) {
    return null;
  }

  const year = new Date(user.createdAt).getFullYear();

  return (
    <Card className="w-2xs">
      <CardContent>
        <Stack orientation="vertical" className="items-center">
          <Avatar className="mb-4 size-24">
            <AvatarImage src={user.image || ""} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-xl">{user.name}</CardTitle>
          <CardDescription>Member since {year}</CardDescription>
        </Stack>
      </CardContent>
    </Card>
  );
}
