import { ImageIcon, ImageUpIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { User } from "@/app/typings/models";
type ProfileCardProps = {
  user: User;
};

export function ProfileCard({ user }: ProfileCardProps) {
  const year = new Date(user.createdAt).getFullYear();
  return (
    <Card className="min-w-xs">
      <CardHeader>
        <div className="flex flex-col items-center">
          <Avatar className="size-24 mb-4">
            <AvatarImage src={user.image || ""} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-xl">{user.name}</CardTitle>
          <CardDescription>Member since {year}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          <Button variant="outline" className="justify-start">
            <ImageIcon className="mr-2 size-4" />
            View profile picture
          </Button>
          <Button variant="outline" className="justify-start">
            <ImageUpIcon className="mr-2 size-4" />
            Update profile picture
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
