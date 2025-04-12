"use client";

import { Globe, Menu } from "lucide-react";

import Link from "next/link";

import { Logo } from "@/components/icons/logo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DefaultUserAvatar } from "../icons/default-user-avatar";
import { LogoCompact } from "../icons/logo-compact";

export function Header() {
  return (
    <header className="border-b border-gray-200">
      <div className="container px-4 md:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center text-[#ff385c]">
            <Logo className="hidden md:block" />
            <LogoCompact className="block md:hidden" />
          </Link>

          {/* Center - can be used for search on larger screens */}
          <div className="hidden md:flex">
            {/* Search component would go here */}
          </div>

          {/* Right side navigation */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              className="hidden md:flex items-center text-sm"
            >
              Airbnb your home
            </Button>

            <Button variant="ghost" size="icon" className="rounded-full">
              <Globe className="size-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="rounded-full border border-gray-300 flex items-center space-x-2 py-5"
                >
                  <Menu className="size-5" />
                  <span className="size-7 inline-block text-gray-500">
                    <DefaultUserAvatar />
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <Link href="/sign-in" className="w-full">
                    Log in
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/sign-up" className="w-full">
                    Sign up
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/host" className="w-full">
                    Airbnb your home
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="#" className="w-full">
                    Help
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
