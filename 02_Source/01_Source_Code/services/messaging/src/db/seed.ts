import { consola } from "consola";
import { db } from ".";
import {
  conversationTable,
  messageTable
} from "./schema";

import conversationData from './data/conversation.json';
import messageData from './data/message.json';

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
      await db.delete(conversationTable);
      await db.delete(messageTable);
    })
    .catch((error) => {
      consola.error("Error deleting tables", error);
    });


    const conversation = conversationData.map((c) =>
      convertDateFields(c, ["createdAt", "updatedAt"])
    );
    const message = messageData.map((m) =>
      convertDateFields(m, ["sendAt"])
    );

    await Promise.resolve()
    .then(async () => {
      await Promise.all([
        db.insert(conversationTable).values(conversation as (typeof conversationTable.$inferInsert)[]),
        db.insert(messageTable).values(message as (typeof messageTable.$inferInsert)[]),
      ]);
      consola.success("Database seeded successfully");
    })
    .catch((error) => {
      consola.error("Error seeding database", error);
    });
  
}

seedDatabase();
