import { eq } from "drizzle-orm";
import { db } from "../db";
import { amenitiesTable } from "../db/schema";
import { routeFactory } from "../utils/route-factory";

const route = routeFactory.createApp();

route.get("/", async (c) => {
  const amenities = await db.select().from(amenitiesTable);
  return c.var.data(amenities);
});

route.get("/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const [amenity] = await db
    .select()
    .from(amenitiesTable)
    .where(eq(amenitiesTable.id, id));
  return amenity ? c.var.data(amenity) : c.var.notFound();
});

route.post("/", (c) => {
  return c.text("Create Amenity");
});

route.put("/:id", (c) => {
  return c.text(`Update Amenity: ${c.req.param("id")}`);
});

route.delete("/:id", (c) => {
  return c.text(`Delete Amenity: ${c.req.param("id")}`);
});

export const amenitiesRoute = route;
