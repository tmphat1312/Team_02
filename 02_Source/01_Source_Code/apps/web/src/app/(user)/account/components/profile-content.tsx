import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { UpdateLogin } from "./login/update-login";
import { UserPayment } from "./payment/user-payment";
import { UpdatePersonalInfo } from "./personal/update-personal-info";

export function ProfileContent() {
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
            <UpdatePersonalInfo />
          </TabsContent>
          <TabsContent value="login-security">
            <UpdateLogin />
          </TabsContent>
          <TabsContent value="payments">
            <UserPayment />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
