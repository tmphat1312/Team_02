import { Hono } from "hono";

import { ErrorCode } from "../constants/error-codes";

import { db } from "../db";

import { wishlistsTable } from "../db/schema";

import { badRequest, created, notFound } from "../utils/json-helpers";

const route = new Hono();

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

export const wishlistsRoute = route;
