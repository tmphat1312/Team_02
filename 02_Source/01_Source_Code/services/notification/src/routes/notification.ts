import { and, eq } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";

import { db } from "../db";
import { notificationsTable } from "../db/schema";
import { created, ok } from "../utils/json-helpers";
import { zodValidator } from "../utils/zod-validator";

const route = new Hono();

route.get(
  "/",
  zodValidator(
    "query",
    z.object({
      userId: z.string(),
    })
  ),
  async (c) => {
    const { userId } = c.req.valid("query");
    const rows = await db
      .select()
      .from(notificationsTable)
      .where(eq(notificationsTable.userId, userId));
    return ok(c, rows);
  }
);

route.post(
  "/",
  zodValidator(
    "json",
    z.object({
      userId: z.string(),
      title: z.string(),
      message: z.string(),
    })
  ),
  async (c) => {
    const { userId, title, message } = c.req.valid("json");
    const results = await db.insert(notificationsTable).values({
      userId,
      title,
      message,
    });
    console.log(results);
    return created(c, null);
  }
);

route.post(
  "/:id/read",
  zodValidator("param", z.object({ id: z.number() })),
  async (c) => {
    const { id } = c.req.valid("param");
    await db
      .update(notificationsTable)
      .set({ isRead: true, readAt: new Date() })
      .where(eq(notificationsTable.id, id))
      .returning();
    return ok(c, null);
  }
);

export { route as notificationRoute };
