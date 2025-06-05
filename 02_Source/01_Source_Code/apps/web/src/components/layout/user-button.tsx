"use client";

import { Menu } from "lucide-react";
import Link, { LinkProps } from "next/link";

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
import { HostSignedIn } from "@/features/auth/components/host-signed-in";
import { SignOutButton } from "@/features/auth/components/sign-out-button";
import { SignedIn } from "@/features/auth/components/signed-in";
import { SignedOut } from "@/features/auth/components/signed-out";
import { TenantSignedIn } from "@/features/auth/components/tenant-signed-in";
import { useUser } from "@/features/auth/hooks/use-user";
import { cn } from "@/lib/utils";

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
          <LinkItem href="/sign-in">Log in</LinkItem>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <LinkItem href="/sign-up">Sign up</LinkItem>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup className="py-2">
        <DropdownMenuItem asChild>
          <LinkItem href="/host">Rento your home</LinkItem>
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
          <LinkItem href="/trips" className="font-medium">
            Trips
          </LinkItem>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <LinkItem href="/wishlists" className="font-medium">
            Wishlists
          </LinkItem>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup className="py-2">
        <HostSignedInItems />
        <TenantSignedInItems />
        <DropdownMenuItem asChild>
          <LinkItem href="/account">Account</LinkItem>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup className="py-2">
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
        <LinkItem href="/host">Manage listings</LinkItem>
      </DropdownMenuItem>
    </HostSignedIn>
  );
}

function TenantSignedInItems() {
  return (
    <TenantSignedIn>
      <DropdownMenuItem asChild>
        <LinkItem href="/host">Rento your home</LinkItem>
      </DropdownMenuItem>
    </TenantSignedIn>
  );
}

function LinkItem({
  className,
  ...props
}: LinkProps & React.ComponentProps<"a">) {
  return (
    <Link
      className={cn(className, "w-full py-2.5 cursor-pointer flex")}
      {...props}
    />
  );
}
