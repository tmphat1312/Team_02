import { gte } from "drizzle-orm";
import { Hono } from "hono";

import { db } from "../db";
import { reservationTable } from "../db/schema";
import { ok } from "../utils/json-helpers";

const route = new Hono();

route.get("/:propertyId", async (c) => {
  const results = await db
    .select({
      reservationId: reservationTable.id,
      startDate: reservationTable.checkInDate,
      endDate: reservationTable.checkOutDate,
      tenantId: reservationTable.tenantId,
    })
    .from(reservationTable)
    .where(gte(reservationTable.checkInDate, new Date()));
  return ok(c, results);
});

export { route as availabilityRoute };
