import Link from "next/link";

import { cn } from "@/lib/utils";

import { Dot } from "../icons/dot";
import { FacebookBlack } from "../icons/facebook-black";
import { InstagramBlack } from "../icons/instagram-black";
import { PrivacyChoice } from "../icons/privacy-choice";
import { XBlack } from "../icons/x-black";

type FooterProps = {
  containerStyle?: "wide" | "narrow";
};

export function Footer({ containerStyle = "wide" }: FooterProps) {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-6">
      <div
        className={cn(
          containerStyle == "wide" ? "width-container" : "details-container",
          "px-4"
        )}
      >
        <div className="flex flex-col md:flex-row justify-center lg:justify-between items-center flex-wrap gap-6">
          <div className="flex items-center flex-col md:flex-row gap-4 font-medium text-gray-700 text-sm">
            <p className="text-sm text-gray-700">© 2025 Airbnb, Inc.</p>
            <Dot className="hidden md:block" />
            <Link href="#" className="hover:underline">
              Terms
            </Link>
            <Dot className="hidden md:block" />
            <Link href="#" className="hover:underline">
              Sitemap
            </Link>
            <Dot className="hidden md:block" />
            <Link href="#" className="hover:underline">
              Privacy
            </Link>
            <Dot className="hidden md:block" />
            <Link href="#" className="hover:underline flex items-center gap-2">
              Your Privacy Choices
              <PrivacyChoice className="translate-y-1/6" />
            </Link>
          </div>

          <div className="flex items-center gap-4.5 font-medium text-sm text-gray-700">
            <span>English (US)</span>
            <Dot />
            <span>₫ VND</span>
            <Dot />
            <div className="flex items-center gap-4">
              <Link
                href="https://fb.com"
                rel="noreferrer noopener"
                target="_blank"
                aria-label="Facebook"
              >
                <FacebookBlack />
              </Link>
              <Link
                href="https://x.com"
                rel="noreferrer noopener"
                target="_blank"
                aria-label="X"
              >
                <XBlack />
              </Link>
              <Link
                href="https://instagram.com"
                rel="noreferrer noopener"
                target="_blank"
                aria-label="Instagram"
              >
                <InstagramBlack />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
