import { desc, eq } from "drizzle-orm";
import { Hono } from "hono";

import { ErrorCode } from "../constants/error-codes";

import { db } from "../db";
import { categoriesTable } from "../db/schema";

import { transformPaginationQuery } from "../middlewares/transform-pagination-query";
import { uploadImageMiddleware } from "../middlewares/upload-image";

import { cloudinaryClient } from "../lib/cloudinary-client";

import { badRequest, created, noContent, ok } from "../utils/json-helpers";
import {
  calculateOffset,
  calculateTotalPages,
} from "../utils/pagination-calculators";

const route = new Hono();

route.get("/", transformPaginationQuery, async (c) => {
  const { page, pageSize } = c.var.pagination;
  const offset = calculateOffset({ page, pageSize });

  const getCategoriesQuery = db
    .select()
    .from(categoriesTable)
    .limit(pageSize)
    .offset(offset)
    .orderBy(desc(categoriesTable.id));
  const countCategoriesQuery = db.$count(categoriesTable);

  const [categories, totalItems] = await Promise.all([
    getCategoriesQuery,
    countCategoriesQuery,
  ]);

  const currentPage = page;
  const totalPages = calculateTotalPages({ totalItems, pageSize });

  return ok(c, {
    data: categories,
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

    const [existingCategory] = await db
      .select({ id: categoriesTable.id })
      .from(categoriesTable)
      .where(eq(categoriesTable.name, name));

    if (existingCategory) {
      return badRequest(
        c,
        `Category with name "${name}" already exists.`,
        ErrorCode.CATEGORY_ALREADY_EXISTS
      );
    }

    await next();
  },
  uploadImageMiddleware({
    inputFieldName: "image",
    folder: "Categories",
  }),
  async (c) => {
    const { name, description } = await c.req.parseBody<{
      name: string;
      description: string;
    }>();

    const [createdCategory] = await db
      .insert(categoriesTable)
      .values({
        name: name,
        description: description,
        imageUrl: c.var.imageUrl,
      })
      .returning();

    return created(c, {
      data: createdCategory,
    });
  }
);

route.delete("/:id", async (c) => {
  const id = c.req.param("id");

  const [deletedCategory] = await db
    .delete(categoriesTable)
    .where(eq(categoriesTable.id, Number(id)))
    .returning();

  if (deletedCategory) {
    cloudinaryClient.deleteImage(deletedCategory.imageUrl);
  }

  return noContent(c);
});

export const categoriesRoute = route;
