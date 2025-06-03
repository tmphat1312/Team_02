import { Hono } from "hono";
import { z } from "zod";

import { and, eq } from "drizzle-orm";
import { db } from "../db";
import { reviewTable } from "../db/schema";
import { badRequest, ok } from "../utils/json-helpers";
import { reviewSchema } from "../utils/validation";
import { zValidator } from "../utils/validator-wrapper";

const route = new Hono();

route.get(
  "/",
  zValidator(
    "query",
    z.object({
      propertyId: z
        .string({
          message: "propertyId is required",
        })
        .transform((val) => parseInt(val)),
    })
  ),
  async (c) => {
    const { propertyId } = c.req.valid("query");
    const results = await db
      .select()
      .from(reviewTable)
      .where(eq(reviewTable.propertyId, propertyId));
    return ok(c, results);
  }
);

route.post("/", zValidator("json", reviewSchema)    , async (c) => {
  const review = c.req.valid("json");

  const [existingReview] = await db
    .select()
    .from(reviewTable)
    .where(
      and(
        eq(reviewTable.tenantId, review.tenantId),
        eq(reviewTable.propertyId, review.propertyId),
        eq(reviewTable.reservationId, review.reservationId)
      )
    );

  if (existingReview) {
    return badRequest(
      c,
      `You have already submitted a review for this reservation.`
    );
  }

  const [newReview] = await db.insert(reviewTable).values(review).returning();
  return ok(c, newReview);
});

export default route;
