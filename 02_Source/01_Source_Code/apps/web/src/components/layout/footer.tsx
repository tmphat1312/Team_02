import Link from "next/link";
import { Facebook, Twitter, Instagram, Globe, DollarSign } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-12 pb-6">
      <div className="container px-4">
        {/* Main footer sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Support column */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-gray-600 hover:underline">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:underline">
                  AirCover
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:underline">
                  Anti-discrimination
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:underline">
                  Disability support
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:underline">
                  Cancellation options
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:underline">
                  Report neighborhood concern
                </Link>
              </li>
            </ul>
          </div>

          {/* Hosting column */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Hosting</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-gray-600 hover:underline">
                  Airbnb your home
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:underline">
                  AirCover for Hosts
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:underline">
                  Hosting resources
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:underline">
                  Community forum
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:underline">
                  Hosting responsibly
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:underline">
                  Airbnb-friendly apartments
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:underline">
                  Join a free Hosting class
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:underline">
                  Find a co-host
                </Link>
              </li>
            </ul>
          </div>

          {/* Airbnb column */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Airbnb</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-gray-600 hover:underline">
                  Newsroom
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:underline">
                  New features
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:underline">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:underline">
                  Investors
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:underline">
                  Gift cards
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:underline">
                  Airbnb.org emergency stays
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="pt-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 mb-4 md:mb-0">
              <p className="text-sm text-gray-600">© 2025 Airbnb, Inc.</p>
              <div className="flex items-center space-x-4">
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:underline"
                >
                  Terms
                </Link>
                <span className="text-gray-300">·</span>
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:underline"
                >
                  Sitemap
                </Link>
                <span className="text-gray-300">·</span>
                <Link 
                  href="#"
                  className="text-sm text-gray-600 hover:underline"
                >
                  Privacy
                </Link>
                <span className="text-gray-300">·</span>
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:underline flex items-center"
                >
                  Your Privacy Choices
                  <span className="ml-1 flex items-center justify-center w-4 h-4 bg-blue-600 rounded-full">
                    <span className="text-white text-[8px]">✓</span>
                  </span>
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="flex items-center text-sm text-gray-600">
                <Globe className="h-4 w-4 mr-1" />
                English (US)
              </button>
              <button className="flex items-center text-sm text-gray-600">
                <DollarSign className="h-4 w-4 mr-1" />
                VND
              </button>
              <div className="flex items-center space-x-4">
                <Link href="#" aria-label="Facebook">
                  <Facebook className="h-5 w-5 text-gray-600" />
                </Link>
                <Link href="#" aria-label="Twitter">
                  <Twitter className="h-5 w-5 text-gray-600" />
                </Link>
                <Link href="#" aria-label="Instagram">
                  <Instagram className="h-5 w-5 text-gray-600" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
