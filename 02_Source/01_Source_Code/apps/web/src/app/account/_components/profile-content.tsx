"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, CreditCard, Settings } from "lucide-react";

export default function ProfileContent() {
  const [user] = useState({
    name: "Jane Doe",
    email: "jane.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, San Francisco, CA 94105",
    dob: "1990-01-01",
    profileImage: "/placeholder.svg?height=100&width=100",
  });

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-1/4">
          <Card>
            <CardHeader className="pb-4">
              <div className="flex flex-col items-center">
                <Avatar className="size-24 mb-4">
                  <AvatarImage
                    src={user.profileImage || "/placeholder.svg"}
                    alt={user.name}
                  />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">{user.name}</CardTitle>
                <CardDescription>Member since 2021</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <User className="mr-2 size-4" />
                  View profile
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="mr-2 size-4" />
                  Account settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main content */}
        <div className="w-full md:w-3/4">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Account Settings</CardTitle>
              <CardDescription>
                Manage your account settings and preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="personal-info" className="w-full">
                <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mb-8">
                  <TabsTrigger value="personal-info">Personal Info</TabsTrigger>
                  <TabsTrigger value="login-security">
                    Login & Security
                  </TabsTrigger>
                  <TabsTrigger value="payments">Payments</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                  <TabsTrigger value="privacy">Privacy</TabsTrigger>
                  <TabsTrigger value="preferences">Preferences</TabsTrigger>
                </TabsList>

                {/* Personal Info Tab */}
                <TabsContent value="personal-info" className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Legal Name</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">First name</Label>
                        <Input id="first-name" defaultValue="Jane" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Last name</Label>
                        <Input id="last-name" defaultValue="Doe" />
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      This is the name on your travel document, which could be a
                      license or a passport.
                    </p>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-4">
                      Contact Information
                    </h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input
                          id="email"
                          type="email"
                          defaultValue={user.email}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          defaultValue={user.phone}
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-4">Address</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="address">Street address</Label>
                        <Input id="address" defaultValue={user.address} />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input id="city" defaultValue="San Francisco" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">State</Label>
                          <Input id="state" defaultValue="CA" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="zip">ZIP code</Label>
                          <Input id="zip" defaultValue="94105" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-4">
                      Emergency Contact
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="emergency-name">Name</Label>
                        <Input
                          id="emergency-name"
                          placeholder="Emergency contact name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="emergency-phone">Phone</Label>
                        <Input
                          id="emergency-phone"
                          type="tel"
                          placeholder="Emergency contact phone"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button className="bg-[#ff385c] hover:bg-[#e31c5f]">
                      Save Changes
                    </Button>
                  </div>
                </TabsContent>

                {/* Login & Security Tab */}
                <TabsContent value="login-security" className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Login</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Password</p>
                          <p className="text-sm text-gray-500">
                            Last updated 3 months ago
                          </p>
                        </div>
                        <Button variant="outline">Update</Button>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">
                            Two-factor authentication
                          </p>
                          <p className="text-sm text-gray-500">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-4">Account</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Deactivate your account</p>
                          <p className="text-sm text-gray-500">
                            Temporarily deactivate your account
                          </p>
                        </div>
                        <Button variant="outline">Deactivate</Button>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-red-500">
                            Delete account
                          </p>
                          <p className="text-sm text-gray-500">
                            Permanently delete your account and data
                          </p>
                        </div>
                        <Button variant="destructive">Delete</Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Payments Tab */}
                <TabsContent value="payments" className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">
                      Payment Methods
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 border rounded-lg">
                        <div className="flex items-center">
                          <CreditCard className="h-10 w-10 text-gray-400 mr-4" />
                          <div>
                            <p className="font-medium">Visa ending in 4242</p>
                            <p className="text-sm text-gray-500">
                              Expires 12/2025
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            Remove
                          </Button>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full">
                        Add Payment Method
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-4">Coupons</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Add a coupon</p>
                          <p className="text-sm text-gray-500">
                            Have a coupon code? Add it here
                          </p>
                        </div>
                        <Button variant="outline">Add</Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Other tabs would be implemented similarly */}
                <TabsContent value="notifications">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">
                        Email Notifications
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Booking updates</p>
                            <p className="text-sm text-gray-500">
                              Receive updates about your bookings
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Promotions and tips</p>
                            <p className="text-sm text-gray-500">
                              Receive travel deals and recommendations
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Account activity</p>
                            <p className="text-sm text-gray-500">
                              Receive alerts about account activity
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="privacy">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">
                        Privacy Settings
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Profile visibility</p>
                            <p className="text-sm text-gray-500">
                              Control who can see your profile information
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              Public
                            </Button>
                            <Button variant="outline" size="sm">
                              Private
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Data sharing</p>
                            <p className="text-sm text-gray-500">
                              Control how your data is used for personalization
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="preferences">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">
                        Global Preferences
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Language</p>
                            <p className="text-sm text-gray-500">
                              Select your preferred language
                            </p>
                          </div>
                          <Button variant="outline">English (US)</Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Currency</p>
                            <p className="text-sm text-gray-500">
                              Select your preferred currency
                            </p>
                          </div>
                          <Button variant="outline">USD ($)</Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Time zone</p>
                            <p className="text-sm text-gray-500">
                              Select your time zone
                            </p>
                          </div>
                          <Button variant="outline">Pacific Time (US)</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
