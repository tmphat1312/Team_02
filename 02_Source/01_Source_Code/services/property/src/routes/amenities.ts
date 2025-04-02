import { eq } from "drizzle-orm";
import { db } from "../db";
import { amenitiesTable } from "../db/schema";
import { uploadImageMiddleware } from "../middlewares/upload-image";
import { routeFactory } from "../utils/route-factory";

const route = routeFactory.createApp();

route.post(
  "/",
  async (c, next) => {
    const { name } = await c.req.parseBody();

    const [existingAmenity] = await db
      .select()
      .from(amenitiesTable)
      .where(eq(amenitiesTable.name, name as string));

    if (existingAmenity) {
      return c.var.badRequest(`Amenity with name "${name}" already exists.`);
    }

    await next();
  },
  uploadImageMiddleware({
    inputFieldName: "image",
    folder: "Amenities",
  }),
  async (c) => {
    const { name, description } = await c.req.parseBody();

    const [res] = await db
      .insert(amenitiesTable)
      .values({
        name: name as string,
        description: description as string,
        imagePath: c.var.imageUrl,
      })
      .returning();

    return c.var.created(res);
  }
);

route.delete("/:id", async (c) => {
  const id = c.req.param("id");
  await db.delete(amenitiesTable).where(eq(amenitiesTable.id, Number(id)));
  return c.var.noContent();
});

export const amenitiesRoute = route;
