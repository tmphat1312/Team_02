import { desc, eq } from "drizzle-orm";
import { Hono } from "hono";

import { db } from "../db";
import { amenitiesTable } from "../db/schema";

import { cloudinaryClient } from "../lib/cloudinary-client";

import { transformPaginationQuery } from "../middlewares/transform-pagination-query";
import { uploadImageMiddleware } from "../middlewares/upload-image";

import { badRequest, created, noContent, ok } from "../utils/json-helpers";

const route = new Hono();

route.get("/", transformPaginationQuery, async (c) => {
  const { page, pageSize } = c.var.pagination;
  const offset = (page - 1) * pageSize;

  const getAmenitiesQuery = db
    .select()
    .from(amenitiesTable)
    .limit(pageSize)
    .offset(offset)
    .orderBy(desc(amenitiesTable.id));
  const countAmenitiesQuery = db.$count(amenitiesTable);

  const [amenities, totalItems] = await Promise.all([
    getAmenitiesQuery,
    countAmenitiesQuery,
  ]);

  const currentPage = page;
  const totalPages = Math.ceil(totalItems / pageSize);

  return ok(c, {
    data: amenities,
    meta: {
      pagination: {
        currentPage,
        totalItems,
        totalPages,
        pageSize,
      },
    },
  });
});

route.post(
  "/",
  async (c, next) => {
    const { name } = await c.req.parseBody<{ name: string }>();

    const [existingAmenity] = await db
      .select({ id: amenitiesTable.id })
      .from(amenitiesTable)
      .where(eq(amenitiesTable.name, name));

    if (existingAmenity) {
      return badRequest(c, `Amenity with name "${name}" already exists.`);
    }

    await next();
  },
  uploadImageMiddleware({
    inputFieldName: "image",
    folder: "Amenities",
  }),
  async (c) => {
    const { name, description } = await c.req.parseBody<{
      name: string;
      description: string;
    }>();

    const [createdAmenity] = await db
      .insert(amenitiesTable)
      .values({
        name: name,
        description: description,
        imageUrl: c.var.imageUrl,
      })
      .returning();

    return created(c, {
      data: createdAmenity,
    });
  }
);

route.delete("/:id", async (c) => {
  const id = c.req.param("id");

  const [deletedAmenity] = await db
    .delete(amenitiesTable)
    .where(eq(amenitiesTable.id, Number(id)))
    .returning();

  if (deletedAmenity) {
    await cloudinaryClient.deleteImage(deletedAmenity.imageUrl);
  }

  return noContent(c);
});

export const amenitiesRoute = route;
