import { and, eq, gte } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";

import { db } from "../db";
import { reservationTable } from "../db/schema";
import { ok } from "../utils/json-helpers";
import { zValidator } from "../utils/validator-wrapper";

const route = new Hono();

route.get(
  "/:propertyId",
  zValidator(
    "param",
    z.object({
      propertyId: z
        .string({
          required_error: "propertyId is required",
          invalid_type_error: "propertyId must be a string",
        })
        .transform((val) => parseInt(val)),
    })
  ),
  async (c) => {
    const { propertyId } = c.req.valid("param");
    const whereClause = and(
      gte(reservationTable.checkInDate, new Date()),
      eq(reservationTable.propertyId, propertyId)
    );
    const results = await db
      .select({
        reservationId: reservationTable.id,
        startDate: reservationTable.checkInDate,
        endDate: reservationTable.checkOutDate,
        tenantId: reservationTable.tenantId,
      })
      .from(reservationTable)
      .where(whereClause);
    return ok(c, results);
  }
);

export { route as availabilityRoute };
