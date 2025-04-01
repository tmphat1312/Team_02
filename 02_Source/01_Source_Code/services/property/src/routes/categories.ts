import { eq } from "drizzle-orm";

import { db } from "../db";
import { categoriesTable } from "../db/schema";

import { uploadImageMiddleware } from "../middlewares/upload-image";

import { routeFactory } from "../utils/route-factory";

const route = routeFactory.createApp();

route.post(
  "/",
  async (c, next) => {
    const { name } = await c.req.parseBody();

    const [existingCategory] = await db
      .select()
      .from(categoriesTable)
      .where(eq(categoriesTable.name, name as string));

    if (existingCategory) {
      return c.var.badRequest(`Category with name "${name}" already exists.`);
    }

    await next();
  },
  uploadImageMiddleware({
    inputFieldName: "image",
    folder: "Categories",
  }),
  async (c) => {
    const { name, description } = await c.req.parseBody();

    const [res] = await db
      .insert(categoriesTable)
      .values({
        name: name as string,
        description: description as string,
        imagePath: c.var.imageUrl,
      })
      .returning();

    return c.var.created(res);
  }
);

export const categoriesRoute = route;
