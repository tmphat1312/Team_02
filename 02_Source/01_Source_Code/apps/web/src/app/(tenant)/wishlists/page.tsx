import { Page } from "@/components/layout/page";
import { RecentlyViewed } from "./components/recently-viewed";
import { ToggleEditingButton } from "./components/toggle-editing-button";
import { Wishlist } from "./components/wishlist";
import { PageHeading } from "@/components/typography/page-heading";

export default function WishlistsPage() {
  return (
    <Page className="relative">
      <PageHeading className="sr-only">Wishlists</PageHeading>
      <div className="absolute top-4 right-4">
        <ToggleEditingButton />
      </div>
      <div className="space-y-8">
        <Wishlist />
        <RecentlyViewed />
      </div>
    </Page>
  );
}
