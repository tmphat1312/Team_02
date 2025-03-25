import { count as countFunction, eq } from "drizzle-orm";

import { db } from "../db";
import { categoriesTable } from "../db/schema";
import { routeFactory } from "../utils/route-factory";

const route = routeFactory.createApp();

route.get("/", async (c) => {
  const { page, limit } = c.req.query();

  const parsedPage = Number(page) || 1;
  const parsedLimit = Number(limit) || 10;

  const [categories, [{ count }]] = await Promise.all([
    db
      .select()
      .from(categoriesTable)
      .offset((parsedPage - 1) * parsedLimit)
      .limit(parsedLimit),
    db
      .select({
        count: countFunction(),
      })
      .from(categoriesTable),
  ]);

  return c.var.data(categories, {
    pagination: {
      page: parsedPage,
      limit: parsedLimit,
      totalItems: count,
      totalPages: Math.ceil(count / parsedLimit),
    },
  });
});

route.get("/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const [category] = await db
    .select()
    .from(categoriesTable)
    .where(eq(categoriesTable.id, id));

  if (!category) {
    return c.var.notFound();
  }

  return c.var.data(category);
});

route.post("/", (c) => {
  return c.text("Create Category");
});

route.put("/:id", (c) => {
  return c.text(`Update Category: ${c.req.param("id")}`);
});

route.delete("/:id", (c) => {
  return c.text(`Delete Category: ${c.req.param("id")}`);
});

export const categoriesRoute = route;
