import { consola } from "consola";
import { db } from ".";
import {
  notificationTable
} from "./schema";

import notificationData from "./data/notifications.json";

const convertDateFields = (obj: Record<string, any>, dateFields: string[]) => {
  return {
    ...obj,
    ...Object.fromEntries(
      dateFields.map((key) => [key, obj[key] ? new Date(obj[key]) : null])
    ),
  };
};

async function seedDatabase() {
  await Promise.resolve()
    .then(async () => {
      await db.delete(notificationTable);
    })
    .catch((error) => {
      consola.error("Error deleting tables", error);
    });


    const notifications = notificationData.map((n) =>
      convertDateFields(n, ["createdAt", "updatedAt"])
    );

    await Promise.resolve()
    .then(async () => {
      await Promise.all([
        db.insert(notificationTable).values(notifications as (typeof notificationTable.$inferInsert)[]),
      ]);
      consola.success("Database seeded successfully");
    })
    .catch((error) => {
      consola.error("Error seeding database", error);
    });
  
}

seedDatabase();
