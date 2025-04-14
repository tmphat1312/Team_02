import { CategoryList } from "./_components/category-list";
import { RoomList } from "./_components/room-list";
import { ShowMapButton } from "./_components/show-map-button";

export default function Home() {
  return (
    <main>
      <CategoryList />
      <RoomList />
      <ShowMapButton />
    </main>
  );
}
