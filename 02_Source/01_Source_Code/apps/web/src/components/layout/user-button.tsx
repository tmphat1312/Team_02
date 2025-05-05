"use client";

import { Menu } from "lucide-react";
import Link from "next/link";

import { useUser } from "@/app/(auth)/_hooks/use-user";

import { HostSignedIn } from "@/app/(auth)/_components/host-signed-in";
import { SignOutButton } from "@/app/(auth)/_components/sign-out-button";
import { SignedIn } from "@/app/(auth)/_components/signed-in";
import { SignedOut } from "@/app/(auth)/_components/signed-out";
import { TenantSignedIn } from "@/app/(auth)/_components/tenant-signed-in";
import { DefaultUserAvatar } from "@/components/icons/default-user-avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";

export function UserButton() {
  const { isLoading } = useUser();

  if (isLoading) {
    return <Skeleton className="h-[2.875rem] w-[5.25rem] rounded-full" />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="p-0 has-[>svg]:ps-3.5 has-[>svg]:pe-2"
      >
        <Button
          variant="outline"
          className="rounded-full border border-gray-300 flex items-center   cursor-pointer h-[3rem] py-2 gap-3"
        >
          <Menu size={16} />
          <DefaultUserAvatar className="size-8 text-gray-600/90" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-60 border shadow-xl border-gray-200"
      >
        <SignedOutItems />
        <SignedInItems />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function SignedOutItems() {
  return (
    <SignedOut>
      <DropdownMenuGroup className="py-1.5">
        <DropdownMenuItem asChild>
          <Link href="/sign-in" className="w-full py-2.5 cursor-pointer">
            Log in
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/sign-up" className="w-full py-2.5 cursor-pointer">
            Sign up
          </Link>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup className="py-2">
        <DropdownMenuItem asChild disabled>
          <Link href="#" className="w-full py-2.5 cursor-pointer">
            Gift cards
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild disabled>
          <Link href="#" className="w-full py-2.5 cursor-pointer">
            Host an experience
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/host" className="w-full py-2.5 cursor-pointer">
            Airbnb your home
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild disabled>
          <Link href="#" className="w-full py-2.5 cursor-pointer">
            Help Center
          </Link>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </SignedOut>
  );
}

function SignedInItems() {
  return (
    <SignedIn>
      <DropdownMenuGroup className="py-1.5">
        <DropdownMenuItem asChild>
          <Link
            href="/messages"
            className="w-full py-2.5 font-medium cursor-pointer"
          >
            Messages
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href="/trips"
            className="w-full py-2.5 font-medium cursor-pointer"
          >
            Trips
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href="/wishlists"
            className="w-full py-2.5 font-medium cursor-pointer"
          >
            Wishlists
          </Link>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup className="py-2">
        <HostSignedInItems />
        <TenantSignedInItems />
        <DropdownMenuItem asChild>
          <Link href="/account" className="w-full py-2.5 cursor-pointer">
            Account
          </Link>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup className="py-2">
        <DropdownMenuItem asChild disabled>
          <Link href="#" className="w-full py-2.5 cursor-pointer">
            Gift cards
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild disabled>
          <Link href="#" className="w-full py-2.5 cursor-pointer">
            Help Center
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="p-0">
          <SignOutButton className="w-full py-2.5 px-2 cursor-pointer" />
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </SignedIn>
  );
}

function HostSignedInItems() {
  return (
    <HostSignedIn>
      <DropdownMenuItem asChild>
        <Link href="/host/listings" className="w-full py-2.5 cursor-pointer">
          Manage listings
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild disabled>
        <Link href="#" className="w-full py-2.5 cursor-pointer">
          Host an experience
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild disabled>
        <Link href="#" className="w-full py-2.5 cursor-pointer">
          Refer a Host
        </Link>
      </DropdownMenuItem>
    </HostSignedIn>
  );
}

function TenantSignedInItems() {
  return (
    <TenantSignedIn>
      <DropdownMenuItem asChild>
        <Link href="/host" className="w-full py-2.5 cursor-pointer">
          Airbnb your home
        </Link>
      </DropdownMenuItem>
    </TenantSignedIn>
  );
}
