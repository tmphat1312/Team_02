"use client";

import { useUser } from "@/features/auth/hooks/use-user";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ProfileCard } from "./profile-card";
import { UpdateLoginForm } from "./update-login-form";
import { UpdatePersonalInfoForm } from "./update-personal-info-form";
import { UpdateUserWalletForm } from "./update-user-wallet-form";
import { Grid } from "@/components/layout/grid";

export default function ProfileContent() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Grid className="items-start gap-8 grid-cols-[auto_1fr]">
      <ProfileCard />

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
              <TabsTrigger className="" value="personal-info">
                Personal Info
              </TabsTrigger>
              <TabsTrigger className="" value="login-security">
                Login & Security
              </TabsTrigger>
              <TabsTrigger className="" value="payments">
                Payments
              </TabsTrigger>
            </TabsList>

            <TabsContent value="personal-info" className="space-y-6">
              <UpdatePersonalInfoForm user={user!} />
            </TabsContent>

            <TabsContent value="login-security" className="space-y-6">
              <UpdateLoginForm user={user!} />
            </TabsContent>

            <TabsContent value="payments" className="space-y-6">
              <UpdateUserWalletForm />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </Grid>
  );
}
