import { CategoryList } from "./_components/category-list";
import { RoomList } from "./_components/room-list";

export default function Home() {
  return (
    <main>
      <CategoryList />
      <RoomList />
    </main>
  );
}
