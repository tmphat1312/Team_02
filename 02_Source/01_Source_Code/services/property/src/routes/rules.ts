import { desc, eq } from "drizzle-orm";
import { db } from "../db";
import { rulesTable } from "../db/schema";
import { routeFactory } from "../utils/route-factory";

const route = routeFactory.createApp();

route.get("/common", async (c) => {
  const { page, pageSize } = c.req.query();
  const pageNumber = Number(page || 1);
  const pageSizeNumber = Number(pageSize || 10);

  const rules = await db
    .select()
    .from(rulesTable)
    .where(eq(rulesTable.type, "common"))
    .limit(pageSizeNumber)
    .offset((pageNumber - 1) * pageSizeNumber)
    .orderBy(desc(rulesTable.id));
  const totalItems = await db.$count(rulesTable);

  return c.var.ok(rules, {
    pagination: {
      page: pageNumber,
      pageSize: pageSizeNumber,
      totalItems,
      totalPages: Math.ceil(totalItems / pageSizeNumber),
    },
  });
});

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

route.delete("/:id", async (c) => {
  const { id } = c.req.param();
  await db.delete(rulesTable).where(eq(rulesTable.id, Number(id)));
  return c.var.noContent();
});

export const rulesRoute = route;
