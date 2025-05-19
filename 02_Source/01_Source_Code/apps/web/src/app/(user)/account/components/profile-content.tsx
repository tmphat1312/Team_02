import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { User } from "@/typings/models";
import { UpdateLogin } from "./login/update-login";
import { UpdateUserWallet } from "./payment/update-user-wallet";
import { UpdatePersonalInfo } from "./personal/update-personal-info";

type Props = {
  user: User;
};

export function ProfileContent({ user }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Account Settings</CardTitle>
        <CardDescription>
          Manage your account settings and preferences
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="personal-info">
          <TabsList className="grid grid-cols-3 mb-4 h-10">
            <TabsTrigger value="personal-info">Personal Info</TabsTrigger>
            <TabsTrigger value="login-security">Login & Security</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
          </TabsList>

          <TabsContent value="personal-info">
            <UpdatePersonalInfo user={user} />
          </TabsContent>
          <TabsContent value="login-security">
            <UpdateLogin user={user} />
          </TabsContent>
          <TabsContent value="payments">
            <UpdateUserWallet user={user} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
