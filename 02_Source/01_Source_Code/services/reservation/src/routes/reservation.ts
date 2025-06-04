import { and, eq, not } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";

import { db } from "../db";
import { reservationTable } from "../db/schema";
import { created, ok } from "../utils/json-helpers";
import { reservationSchema } from "../utils/validation";
import { zValidator } from "../utils/validator-wrapper";
import { $notification } from "../lib/notification";
import { $payment } from "../lib/payment";

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
      propertyId
        ? and(
            not(eq(reservationTable.status, "Canceled")),
            eq(reservationTable.propertyId, propertyId)
          )
        : undefined
    );

    const results = await db.select().from(reservationTable).where(whereClause);
    return ok(c, results);
  }
);

route.post("/", zValidator("json", reservationSchema), async (c) => {
  const [newReservation] = await db
    .insert(reservationTable)
    .values(c.req.valid("json"))
    .returning();

  await Promise.all([
    // $notification("@post/notifications", {
    //   body: {
    //     userId: newReservation.hostId,
    //     title: "New Reservation",
    //     message: `You have a new reservation waiting for confirmation.`,
    //   },
    // }),
    $payment("@post/user-payment-history/:reservationId/deposit-payment", {
      body: {
        fromUserId: newReservation.tenantId,
        toUserId: newReservation.hostId,
        amount: Math.ceil(Number(newReservation.totalPrice) * 0.1),
      },
      params: {
        reservationId: newReservation.id.toString(),
      },
    }),
  ]);

  return created(c, newReservation);
});

route.post(
  "/:reservationId/cancel",
  zValidator(
    "param",
    z.object({
      reservationId: z
        .string({
          required_error: "reservationId is required",
          invalid_type_error: "reservationId must be a string",
        })
        .transform((val) => parseInt(val)),
    })
  ),
  async (c) => {
    const { reservationId } = c.req.valid("param");
    const [updatedReservation] = await db
      .update(reservationTable)
      .set({ status: "Canceled" })
      .where(eq(reservationTable.id, reservationId))
      .returning();
    return ok(c, updatedReservation);
  }
);

route.post(
  "/:reservationId/confirm",
  zValidator(
    "param",
    z.object({
      reservationId: z
        .string({
          required_error: "reservationId is required",
          invalid_type_error: "reservationId must be a string",
        })
        .transform((val) => parseInt(val)),
    })
  ),
  async (c) => {
    const { reservationId } = c.req.valid("param");
    const [updatedReservation] = await db
      .update(reservationTable)
      .set({ status: "Confirmed" })
      .where(eq(reservationTable.id, reservationId))
      .returning();
    return ok(c, updatedReservation);
  }
);

route.post(
  "/:reservationId/pay",
  zValidator(
    "param",
    z.object({
      reservationId: z
        .string({
          required_error: "reservationId is required",
          invalid_type_error: "reservationId must be a string",
        })
        .transform((val) => parseInt(val)),
    })
  ),
  async (c) => {
    const { reservationId } = c.req.valid("param");
    const [updatedReservation] = await db
      .update(reservationTable)
      .set({ status: "Paid" })
      .where(eq(reservationTable.id, reservationId))
      .returning();
    await $payment("@post/user-payment-history/:reservationId/full-payment", {
      body: {
        fromUserId: updatedReservation.tenantId,
        toUserId: updatedReservation.hostId,
        amount: Math.ceil(Number(updatedReservation.totalPrice) * 0.9),
      },
      params: {
        reservationId: updatedReservation.id.toString(),
      },
    });
    return ok(c, updatedReservation);
  }
);

route.post(
  "/:reservationId/refund",
  zValidator(
    "param",
    z.object({
      reservationId: z
        .string({
          required_error: "reservationId is required",
          invalid_type_error: "reservationId must be a string",
        })
        .transform((val) => parseInt(val)),
    })
  ),
  async (c) => {
    const { reservationId } = c.req.valid("param");
    const [updatedReservation] = await db
      .update(reservationTable)
      .set({ status: "Refunded" })
      .where(eq(reservationTable.id, reservationId))
      .returning();
    await $payment("@post/user-payment-history/:reservationId/refund", {
      body: {
        fromUserId: updatedReservation.hostId,
        toUserId: updatedReservation.tenantId,
      },
      params: {
        reservationId: updatedReservation.id.toString(),
      },
    });
    return ok(c, updatedReservation);
  }
);

export { route as reservationRoute };
