import { and, eq } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";

import { db } from "../db";
import { reservationTable } from "../db/schema";
import { created, ok } from "../utils/json-helpers";
import { reservationSchema } from "../utils/validation";
import { zValidator } from "../utils/validator-wrapper";

const route = new Hono();

route.get(
  "/",
  zValidator(
    "query",
    z.object({
      tenantId: z.string().optional(),
      hostId: z.string().optional(),
      propertyId: z
        .string()
        .optional()
        .transform((val) => (val ? parseInt(val) : undefined)),
    })
  ),
  async (c) => {
    const { tenantId, hostId, propertyId } = c.req.valid("query");

    const whereClause = and(
      hostId ? eq(reservationTable.hostId, hostId) : undefined,
      tenantId ? eq(reservationTable.tenantId, tenantId) : undefined,
      propertyId ? eq(reservationTable.propertyId, propertyId) : undefined
    );

    const results = await db.select().from(reservationTable).where(whereClause);
    return ok(c, results);
  }
);

route.post("/", zValidator("json", reservationSchema), async (c) => {
  // TODO: Check overlapping reservations

  const [newReservation] = await db
    .insert(reservationTable)
    .values(c.req.valid("json"))
    .returning();

  return created(c, newReservation);
});

export { route as reservationRoute };
