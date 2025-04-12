"use client";

import { Globe, Menu } from "lucide-react";

import Link from "next/link";

import { DefaultUserAvatar } from "@/components/icons/default-user-avatar";
import { Logo } from "@/components/icons/logo";
import { LogoCompact } from "@/components/icons/logo-compact";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignedOut } from "@/app/(auth)/_components/signed-out";
import { SignedIn } from "@/app/(auth)/_components/signed-in";
import { SignOutButton } from "@/app/(auth)/_components/sign-out-button";

export function Header() {
  return (
    <header className="border-b border-gray-200">
      <div className="container px-4 md:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center text-airbnb">
            <Logo className="hidden md:block" />
            <LogoCompact className="block md:hidden" />
          </Link>

          {/* Center - can be used for search on larger screens */}
          <div className="hidden md:flex">
            {/* Search component would go here */}
          </div>

          {/* Right side navigation */}
          <div className="flex items-center gap-3">
            <Link
              href="/host"
              className="hidden md:flex items-center text-sm hover:bg-gray-50 px-4 py-2 rounded-full font-medium"
            >
              Airbnb your home
            </Link>

            <Button variant="ghost" size="icon" className="rounded-full">
              <Globe className="size-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="rounded-full border border-gray-300 flex items-center space-x-1.5 py-5.5 cursor-pointer"
                >
                  <Menu className="size-5" />
                  <span className="size-7 inline-block text-gray-500">
                    <DefaultUserAvatar />
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 border shadow-xl border-gray-200"
              >
                <SignedOut>
                  <DropdownMenuGroup className="py-1.5">
                    <DropdownMenuItem asChild>
                      <Link
                        href="/sign-in"
                        className="w-full py-2.5 cursor-pointer"
                      >
                        Log in
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/sign-up"
                        className="w-full py-2.5 cursor-pointer"
                      >
                        Sign up
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup className="py-2">
                    <DropdownMenuItem asChild>
                      <Link href="#" className="w-full py-2.5 cursor-pointer">
                        Gift cards
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="#" className="w-full py-2.5 cursor-pointer">
                        Host an experience
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/host"
                        className="w-full py-2.5 cursor-pointer"
                      >
                        Airbnb your home
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="#" className="w-full py-2.5 cursor-pointer">
                        Help Center
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </SignedOut>
                <SignedIn>
                  <DropdownMenuGroup className="py-1.5">
                    <DropdownMenuItem asChild>
                      <Link
                        href="#"
                        className="w-full py-2.5 font-medium cursor-pointer"
                      >
                        Messages
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="#"
                        className="w-full py-2.5 font-medium cursor-pointer"
                      >
                        Trips
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="#"
                        className="w-full py-2.5 font-medium cursor-pointer"
                      >
                        Wishlists
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup className="py-2">
                    <DropdownMenuItem asChild>
                      <Link href="#" className="w-full py-2.5 cursor-pointer">
                        Manage listings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="#" className="w-full py-2.5 cursor-pointer">
                        Host an experience
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="#" className="w-full py-2.5 cursor-pointer">
                        Refer a Host
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="#" className="w-full py-2.5 cursor-pointer">
                        Account
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup className="py-2">
                    <DropdownMenuItem asChild>
                      <Link href="#" className="w-full py-2.5 cursor-pointer">
                        Gift cards
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="#" className="w-full py-2.5 cursor-pointer">
                        Help Center
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="p-0">
                      <SignOutButton className="w-full py-2.5 px-2 cursor-pointer" />
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </SignedIn>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
