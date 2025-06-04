import { createFetch, createSchema } from "@better-fetch/fetch";
import { env } from "../env";
import z from "zod";

export const $notification = createFetch({
  baseURL: env.NOTIFICATION_SERVICE_URL,
  schema: createSchema({
    "@post/notifications": {
      input: z.object({
        userId: z.string(),
        title: z.string(),
        message: z.string(),
      }),
    },
  }),
});
