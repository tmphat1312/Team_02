import { Suspense } from "react";

import { RecentlyViewed } from "./_components/recently-viewed";
import { ToggleEditingButton } from "./_components/toggle-editing-button";

export default function WishlistsPage() {
  return (
    <section className="relative">
      <div className="w-fit ms-auto">
        <ToggleEditingButton />
      </div>
      <h1 className="sr-only">Wishlists</h1>
      <Suspense>
        <RecentlyViewed />
      </Suspense>
    </section>
  );
}
