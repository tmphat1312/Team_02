import { consola } from "consola";

import { db } from "./";
import {
  amenitiesTable,
  categoriesTable,
  propertiesTable,
  propertyAmenitiesTable,
  propertyCategoriesTable,
} from "./schema";

const categories = [
  {
    name: "Entire Home",
    description: "A full home or apartment for yourself.",
    imagePath: "/images/entire-home.jpg",
  },
  {
    name: "Private Room",
    description: "A private room in a shared home.",
    imagePath: "/images/private-room.jpg",
  },
  {
    name: "Shared Room",
    description: "A room shared with other guests.",
    imagePath: "/images/shared-room.jpg",
  },
  {
    name: "Hotel Room",
    description: "A standard hotel room or suite.",
    imagePath: "/images/hotel-room.jpg",
  },
  {
    name: "Guesthouse",
    description: "A small, private lodging facility.",
    imagePath: "/images/guesthouse.jpg",
  },
  {
    name: "Cabin",
    description: "A small, rustic home in nature.",
    imagePath: "/images/cabin.jpg",
  },
  {
    name: "Cottage",
    description: "A small, rural house often with a garden.",
    imagePath: "/images/cottage.jpg",
  },
  {
    name: "Villa",
    description: "A luxurious, large house with a private pool.",
    imagePath: "/images/villa.jpg",
  },
  {
    name: "Apartment",
    description: "A self-contained unit in a building.",
    imagePath: "/images/apartment.jpg",
  },
  {
    name: "Loft",
    description: "An open space with an industrial, modern feel.",
    imagePath: "/images/loft.jpg",
  },
  {
    name: "Houseboat",
    description: "A boat designed as a home.",
    imagePath: "/images/houseboat.jpg",
  },
  {
    name: "Chalet",
    description: "A traditional mountain home for winter vacations.",
    imagePath: "/images/chalet.jpg",
  },
  {
    name: "Tiny Home",
    description: "A small, minimalist home.",
    imagePath: "/images/tiny-home.jpg",
  },
  {
    name: "Luxury",
    description: "Premium accommodations with high-end amenities.",
    imagePath: "/images/luxury.jpg",
  },
  {
    name: "Eco-Friendly",
    description:
      "Sustainable features such as solar panels and green building materials.",
    imagePath: "/images/eco-friendly.jpg",
  },
  {
    name: "Pet-Friendly",
    description: "Accommodations that welcome pets.",
    imagePath: "/images/pet-friendly.jpg",
  },
  {
    name: "Family-Friendly",
    description: "Properties ideal for families with children.",
    imagePath: "/images/family-friendly.jpg",
  },
  {
    name: "Romantic",
    description: "Intimate settings perfect for couples.",
    imagePath: "/images/romantic.jpg",
  },
  {
    name: "Accessible",
    description: "Properties designed for guests with disabilities.",
    imagePath: "/images/accessible.jpg",
  },
  {
    name: "Unique Stays",
    description: "One-of-a-kind accommodations like treehouses or yurts.",
    imagePath: "/images/unique-stays.jpg",
  },
  {
    name: "Pool",
    description: "Properties with a private or shared pool.",
    imagePath: "/images/pool.jpg",
  },
  {
    name: "Hot Tub",
    description: "Properties with a hot tub or jacuzzi.",
    imagePath: "/images/hot-tub.jpg",
  },
  {
    name: "Garden",
    description: "Properties with an outdoor garden for relaxation.",
    imagePath: "/images/garden.jpg",
  },
  {
    name: "Fireplace",
    description: "Properties with a fireplace to enhance ambiance.",
    imagePath: "/images/fireplace.jpg",
  },
  {
    name: "BBQ",
    description: "Properties with BBQ facilities.",
    imagePath: "/images/bbq.jpg",
  },
  {
    name: "Sauna",
    description: "Properties with a sauna for relaxation.",
    imagePath: "/images/sauna.jpg",
  },
  {
    name: "Treehouse",
    description: "A unique stay built in the trees for a nature experience.",
    imagePath: "/images/treehouse.jpg",
  },
  {
    name: "Yurt",
    description: "A traditional circular tent, ideal for glamping.",
    imagePath: "/images/yurt.jpg",
  },
  {
    name: "Farm Stay",
    description: "A stay on a working farm with an authentic rural experience.",
    imagePath: "/images/farm-stay.jpg",
  },
  {
    name: "Glamping",
    description: "Glamorous camping with luxurious setups.",
    imagePath: "/images/glamping.jpg",
  },
];

const amenities = [
  {
    name: "Pool",
    description: "Swimming pool",
    imagePath: "/images/pool.jpg",
  },
  {
    name: "Gym",
    description: "Fitness center",
    imagePath: "/images/gym.jpg",
  },
  {
    name: "Parking",
    description: "Parking space",
    imagePath: "/images/parking.jpg",
  },
];

const properties = [
  {
    title: "Modern Villa",
    description: "Spacious and modern villa",
    price: 500000,
  },
  {
    title: "Cozy Apartment",
    description: "Comfortable urban apartment",
    price: 300000,
  },
  {
    title: "Luxury Mansion",
    description: "Exquisite mansion with all amenities",
    price: 1500000,
  },
];

async function seedDatabase() {
  await Promise.try(async () => {
    await db.delete(propertyAmenitiesTable);
    await db.delete(propertyCategoriesTable);
    await db.delete(propertiesTable);
    await db.delete(amenitiesTable);
    await db.delete(categoriesTable);
  }).catch((error) => {
    consola.error("Error deleting tables", error);
  });

  await Promise.try(async () => {
    await Promise.all([
      db
        .insert(categoriesTable)
        .values(categories)
        .returning({
          id: categoriesTable.id,
        })
        .onConflictDoNothing(),
      db.insert(amenitiesTable).values(amenities).returning({
        id: amenitiesTable.id,
      }),
      db.insert(propertiesTable).values(properties).returning({
        id: propertiesTable.id,
      }),
    ]);

    consola.success("Database seeded successfully");
  }).catch((error) => {
    consola.error("Error seeding database", error);
  });
}

seedDatabase();
