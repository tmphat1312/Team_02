import { eq } from "drizzle-orm";

import { db } from "../db";
import { propertiesTable } from "../db/schema";
import { routeFactory } from "../utils/route-factory";

const route = routeFactory.createApp();

route.get("/", async (c) => {
  const properties = await db.select().from(propertiesTable);
  return c.var.data(properties);
});

route.get("/:id", async (c) => {
  const [property] = await db
    .select()
    .from(propertiesTable)
    .where(eq(propertiesTable.id, Number(c.req.param("id"))));

  if (!property) {
    return c.var.notFound();
  }

  return c.var.data(property);
});

route.post("/", (c) => {
  return c.text("Create Property");
});

route.put("/:id", (c) => {
  return c.text(`Update Property: ${c.req.param("id")}`);
});

route.delete("/:id", (c) => {
  return c.text(`Delete Property: ${c.req.param("id")}`);
});

export const propertiesRoute = route;
