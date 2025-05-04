import { desc, eq, sql } from "drizzle-orm";
import { Hono } from "hono";

import { ErrorCode } from "../constants/error-codes";

import { db } from "../db";
import { isValidId } from "../db/query";
import {
  propertiesTable,
  propertyImagesTable,
  wishlistsTable,
} from "../db/schema";

import { transformPaginationQuery } from "../middlewares/transform-pagination-query";

import {
  badRequest,
  created,
  notFound,
  ok,
  noContent,
  forbidden,
} from "../utils/json-helpers";

import {
  calculateOffset,
  calculateTotalPages,
} from "../utils/pagination-calculators";

const route = new Hono();

route.get("/", transformPaginationQuery, async (c) => {
  const { page, pageSize } = c.var.pagination;
  const offset = calculateOffset({ page, pageSize });

  // Input processing
  const tenantId = c.req.header("x-user-id")!;

  // Query
  const rankedImages = db
    .select({
      propertyId: propertyImagesTable.propertyId,
      imageUrl: propertyImagesTable.imageUrl,
      rowNumber:
        sql<number>`ROW_NUMBER() OVER (PARTITION BY ${propertyImagesTable.propertyId} ORDER BY ${propertyImagesTable.id})`.as(
          "rowNumber"
        ),
    })
    .from(propertyImagesTable)
    .as("rankedImages");

  const firstImageSubquery = db
    .select({
      propertyId: rankedImages.propertyId,
      imageUrl: rankedImages.imageUrl,
    })
    .from(rankedImages)
    .where(eq(rankedImages.rowNumber, 1))
    .as("firstImage");

  const getWishlistQuery = db
    .select()
    .from(wishlistsTable)
    .innerJoin(
      propertiesTable,
      eq(wishlistsTable.propertyId, propertiesTable.id)
    )
    .leftJoin(
      firstImageSubquery,
      eq(firstImageSubquery.propertyId, propertiesTable.id)
    )
    .where(eq(wishlistsTable.tenantId, tenantId))
    .orderBy(desc(wishlistsTable.id))
    .limit(pageSize)
    .offset(offset);

  const countWishlistQuery = db.$count(
    wishlistsTable,
    eq(wishlistsTable.tenantId, tenantId)
  );

  const [wishlistRows, totalItems] = await Promise.all([
    getWishlistQuery,
    countWishlistQuery,
  ]);

  // Format result
  const wishlist = wishlistRows.map((row) => ({
    id: row.wishlists.id,
    createdAt: row.wishlists.createdAt,
    updatedAt: row.wishlists.updatedAt,
    property: {
      id: row.properties.id,
      title: row.properties.title,
      address: row.properties.address,
      pricePerNight: parseFloat(row.properties.pricePerNight),
      imageUrl: row.firstImage?.imageUrl ?? null,
      isAvailable: row.properties.isAvailable,
    },
  }));

  // Pagination
  const currentPage = page;
  const totalPages = calculateTotalPages({
    totalItems,
    pageSize,
  });

  // Result
  return ok(c, {
    data: wishlist,
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

route.post("/", async (c) => {
  const tenantId = c.req.header("x-user-id")!;
  const { propertyId } = await c.req.json<{ propertyId: number }>();

  try {
    const [createdWishlist] = await db
      .insert(wishlistsTable)
      .values({
        tenantId,
        propertyId,
      })
      .returning({
        id: wishlistsTable.id,
        createdAt: wishlistsTable.createdAt,
      });

    return created(c, {
      ...createdWishlist,
    });
  } catch (err: unknown) {
    const error = err as { code?: string };

    if (error.code === "23505") {
      return badRequest(
        c,
        "Wishlist already exists.",
        ErrorCode.WISHLIST_ALREADY_EXISTS
      );
    }

    if (error.code === "23503") {
      return notFound(c, "Property not found.", ErrorCode.PROPERTY_NOT_FOUND);
    }

    throw err;
  }
});

route.delete("/:id", async (c) => {
  const wishlistId = parseInt(c.req.param("id"));
  const tenantId = c.req.header("x-user-id")!;

  const wishlistRow = await db
    .select()
    .from(wishlistsTable)
    .where(eq(wishlistsTable.id, wishlistId))
    .limit(1);

  const wishlist = wishlistRow[0];

  if (!wishlist) {
    return notFound(
      c,
      `Wishlist item not found.`,
      ErrorCode.WISHLIST_ITEM_NOT_FOUND
    );
  }

  if (wishlist.tenantId !== tenantId) {
    return forbidden(
      c,
      `You do not have permission to delete this wishlist item.`,
      ErrorCode.FORBIDDEN_WISHLIST
    );
  }

  await db.delete(wishlistsTable).where(eq(wishlistsTable.id, wishlistId));
  return noContent(c);
});

export const wishlistsRoute = route;
