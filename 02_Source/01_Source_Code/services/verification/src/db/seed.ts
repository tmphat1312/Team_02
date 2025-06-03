import { consola } from "consola";
import { db } from "./";
import {
  userTable,
  sessionTable,
  accountTable,
  verificationTable,
} from "./schema";

import userRaw from "./data/user.json";
import sessionRaw from "./data/session.json";
import accountRaw from "./data/account.json";

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
      await db.delete(verificationTable);
      await db.delete(accountTable);
      await db.delete(sessionTable);
      await db.delete(userTable);
    })
    .catch((error) => {
      consola.error("Error deleting tables", error);
    });

  // ✅ Convert lại tất cả dữ liệu timestamp trước khi insert
  const user = userRaw.map((u) =>
    convertDateFields(u, ["createdAt", "updatedAt", "banExpires"])
  );
  const session = sessionRaw.map((s) =>
    convertDateFields(s, ["createdAt", "updatedAt", "expiresAt"])
  );
  const account = accountRaw.map((a) =>
    convertDateFields(a, [
      "createdAt",
      "updatedAt",
      "accessTokenExpiresAt",
      "refreshTokenExpiresAt",
    ])
  );

  await Promise.resolve()
    .then(async () => {
      await Promise.all([
        db.insert(userTable).values(user as (typeof userTable.$inferInsert)[]),
        db
          .insert(sessionTable)
          .values(session as (typeof sessionTable.$inferInsert)[]),
        db
          .insert(accountTable)
          .values(account as (typeof accountTable.$inferInsert)[]),
      ]);
      consola.success("Database seeded successfully");
    })
    .catch((error) => {
      consola.error("Error seeding database", error);
    });
}

seedDatabase();
