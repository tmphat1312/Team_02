import { db } from "./";
import {
  categoriesTable,
  amenitiesTable,
  propertiesTable,
  propertyAmenitiesTable,
  propertyCategoriesTable,
} from "./schema";
import { consola } from "consola";

const categories = [
  {
    name: "Luxury",
    description: "High-end properties",
    imagePath: "/images/luxury.jpg",
  },
  {
    name: "Family",
    description: "Perfect for families",
    imagePath: "/images/family.jpg",
  },
  {
    name: "Apartment",
    description: "Urban apartments",
    imagePath: "/images/apartment.jpg",
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
    const seededCategories = await db
      .insert(categoriesTable)
      .values(categories)
      .returning({
        id: categoriesTable.id,
      });
    const seededAmenities = await db
      .insert(amenitiesTable)
      .values(amenities)
      .returning({
        id: amenitiesTable.id,
      });
    const seededProperties = await db
      .insert(propertiesTable)
      .values(properties)
      .returning({
        id: propertiesTable.id,
      });

    const propertyAmenities = [
      {
        propertyId: seededProperties[0].id,
        amenityId: seededAmenities[0].id,
      },
      {
        propertyId: seededProperties[0].id,
        amenityId: seededAmenities[1].id,
      },
      {
        propertyId: seededProperties[1].id,
        amenityId: seededAmenities[2].id,
      },
      {
        propertyId: seededProperties[2].id,
        amenityId: seededAmenities[0].id,
      },
      {
        propertyId: seededProperties[2].id,
        amenityId: seededAmenities[1].id,
      },
      {
        propertyId: seededProperties[2].id,
        amenityId: seededAmenities[2].id,
      },
    ];

    const propertyCategories = [
      {
        propertyId: seededProperties[0].id,
        categoryId: seededCategories[0].id,
      },
      {
        propertyId: seededProperties[1].id,
        categoryId: seededCategories[1].id,
      },
      {
        propertyId: seededProperties[2].id,
        categoryId: seededCategories[0].id,
      },
    ];

    await db.insert(propertyCategoriesTable).values(propertyCategories);
    await db.insert(propertyAmenitiesTable).values(propertyAmenities);

    consola.success("Database seeded successfully");
  }).catch((error) => {
    consola.error("Error seeding database", error);
  });
}

seedDatabase();
