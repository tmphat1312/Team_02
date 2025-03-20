import { db } from "./";
import { amenitiesTable, categoriesTable, propertiesTable } from "./schema";

async function seed() {
  console.log("🌱 Seeding database...");

  const categoryId = await db
    .insert(categoriesTable)
    .values([
      {
        name: "Luxury",
        description: "High-end properties",
        imagePath: "/images/luxury.jpg",
      },
      {
        name: "Budget",
        description: "Affordable properties",
        imagePath: "/images/budget.jpg",
      },
    ])
    .returning({ id: categoriesTable.id });

  console.log("✅ Categories seeded");

  // const amenityId = await db
  //   .insert(amenitiesTable)
  //   .values([
  //     {
  //       name: "Pool",
  //       description: "Private swimming pool",
  //       imagePath: "/images/pool.jpg",
  //     },
  //     {
  //       name: "Gym",
  //       description: "Fully-equipped gym",
  //       imagePath: "/images/gym.jpg",
  //     },
  //   ])
  //   .returning({ id: amenitiesTable.id });

  // console.log("✅ Amenities seeded");

  // if (categoryId.length > 0 && amenityId.length > 0) {
  //   await db.insert(propertiesTable).values([
  //     {
  //       title: "Luxury Villa",
  //       description: "A beautiful luxury villa with a pool",
  //       price: 500000,
  //       imagePath: "/images/villa.jpg",
  //       categoryId: categoryId[0].id,
  //       amenitiesId: amenityId[0].id,
  //     },
  //     {
  //       title: "Budget Apartment",
  //       description: "Affordable apartment in the city",
  //       price: 100000,
  //       imagePath: "/images/apartment.jpg",
  //       categoryId: categoryId[1].id,
  //       amenitiesId: amenityId[1].id,
  //     },
  //   ]);
  //   console.log("✅ Properties seeded");
  // }

  console.log("🌱 Database seeding complete!");
}

seed()
  .catch((error) => {
    console.error("❌ Seeding failed:", error);
  })
  .finally(() => process.exit());
