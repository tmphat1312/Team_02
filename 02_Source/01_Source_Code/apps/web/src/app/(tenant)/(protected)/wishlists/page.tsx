import { RecentlyViewed } from "./_components/recently-viewed";
import { ToggleEditingButton } from "./_components/toggle-editing-button";
import { Wishlist } from "./_components/wishlist";

export default function WishlistsPage() {
  return (
    <section className="relative">
      <div className="w-fit ms-auto">
        <ToggleEditingButton />
      </div>
      <h1 className="sr-only">Wishlists</h1>
      <div className="space-y-8">
        <Wishlist />
        <RecentlyViewed />
      </div>
    </section>
  );
}
