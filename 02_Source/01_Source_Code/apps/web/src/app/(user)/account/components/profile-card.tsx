import { DefaultUserAvatar } from "@/components/icons/default-user-avatar";
import { Stack } from "@/components/layout/stack";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { User } from "@/typings/models";

type Props = {
  user: User;
};

export function ProfileCard({ user }: Props) {
  const year = new Date(user.createdAt).getFullYear();
  return (
    <Card>
      <CardContent>
        <Stack orientation="vertical" className="items-center">
          <Avatar className="mb-4 size-24">
            <AvatarImage src={user.image || ""} alt={user.name} />
            <AvatarFallback>
              <DefaultUserAvatar className="text-gray-600/50" />
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-xl">{user.name}</CardTitle>
          <CardDescription>Member since {year}</CardDescription>
        </Stack>
      </CardContent>
    </Card>
  );
}
