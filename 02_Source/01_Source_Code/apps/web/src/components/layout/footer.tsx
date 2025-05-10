import { Dot, Globe } from "lucide-react";
import Link from "next/link";

import { FacebookBlack } from "../icons/facebook-black";
import { InstagramBlack } from "../icons/instagram-black";
import { PrivacyChoice } from "../icons/privacy-choice";
import { XBlack } from "../icons/x-black";
import { Container } from "./container";
import { Stack } from "./stack";

type FooterProps = {
  containerType?: "wide" | "narrow";
};

const SocialMediaLinks = [
  {
    href: "https://fb.com",
    label: "Facebook",
    icon: <FacebookBlack />,
  },
  {
    href: "https://x.com",
    label: "X",
    icon: <XBlack />,
  },
  {
    href: "https://instagram.com",
    label: "Instagram",
    icon: <InstagramBlack />,
  },
];
const Language = "English (US)";
const Currency = "$ USD";

export function Footer({ containerType = "wide" }: FooterProps) {
  return (
    <footer className="py-4 border-t">
      <Container size={containerType == "wide" ? "default" : "sm"}>
        <Stack
          orientation="vertical"
          className="flex-wrap justify-center gap-6 md:flex-row lg:justify-between md:items-center"
        >
          <Stack
            orientation="vertical"
            className="items-center gap-1 md:flex-row"
          >
            <p>&copy;2025 Airbnb, Inc.</p>
            <Dot size={16} className="hidden md:block" />
            <Link href="#" className="hover:underline">
              Terms
            </Link>
            <Dot size={16} className="hidden md:block" />
            <Link href="#" className="hover:underline">
              Sitemap
            </Link>
            <Dot size={16} className="hidden md:block" />
            <Link href="#" className="hover:underline">
              Privacy
            </Link>
            <Dot size={16} className="hidden md:block" />
            <Link href="#" className="flex items-center gap-2 hover:underline">
              Your Privacy Choices
              <PrivacyChoice />
            </Link>
          </Stack>

          <Stack className="gap-5">
            <span className="flex items-center gap-1.5">
              <Globe size={16} className="stroke-current mt-0.5" />
              {Language}
            </span>
            <span>{Currency}</span>

            <nav className="flex items-center gap-4">
              {SocialMediaLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  rel="noreferrer noopener"
                  target="_blank"
                  aria-label={link.label}
                >
                  {link.icon}
                </Link>
              ))}
            </nav>
          </Stack>
        </Stack>
      </Container>
    </footer>
  );
}
