import { eq } from "drizzle-orm";
import { db } from "../db";
import { rulesTable } from "../db/schema";
import { routeFactory } from "../utils/route-factory";

const route = routeFactory.createApp();

route.post("/", async (c) => {
  const { name, description, type } = await c.req.json<
    typeof rulesTable.$inferInsert
  >();

  const [existingRule] = await db
    .select()
    .from(rulesTable)
    .where(eq(rulesTable.name, name));

  if (existingRule) {
    return c.var.badRequest("Rule already exists");
  }

  const [res] = await db
    .insert(rulesTable)
    .values({
      name,
      description,
      type,
    })
    .returning();

  return c.var.created(res);
});

export const rulesRoute = route;
