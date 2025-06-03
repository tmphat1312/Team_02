import { createFetch, createSchema } from "@better-fetch/fetch";
import { env } from "../env";
import z from "zod";

export const $payment = createFetch({
  baseURL: env.PAYMENT_SERVICE_URL,
  schema: createSchema({
    "@post/user-payment-history/:reservationId/deposit-payment": {
      input: z.object({
        fromUserId: z.string(),
        toUserId: z.string(),
        amount: z.coerce.number(),
      }),
    },
    "@post/user-payment-history/:reservationId/full-payment": {
      input: z.object({
        fromUserId: z.string(),
        toUserId: z.string(),
        amount: z.coerce.number(),
      }),
    },
    "@post/user-payment-history/:reservationId/refund": {
      input: z.object({
        fromUserId: z.string(),
        toUserId: z.string(),
      }),
    },
  }),
});
