import { EditButton } from "@/components/edit-button";
import { Page } from "@/components/layout/page";
import { Stack } from "@/components/layout/stack";

import { RecentlyViewed } from "./components/recently-viewed";
import { Wishlist } from "./components/wishlist";

export default function WishlistsPage() {
  return (
    <Page className="relative">
      <div className="absolute top-6 right-4">
        <EditButton />
      </div>
      <Stack orientation="vertical" className="gap-8">
        <Wishlist />
        <RecentlyViewed />
      </Stack>
    </Page>
  );
}
