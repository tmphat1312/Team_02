import { Env } from "@adonisjs/env";

export const env = await Env.create(new URL("./", import.meta.url), {
  PORT: Env.schema.number(),
  DATABASE_URL: Env.schema.string(),
  BETTER_AUTH_SECRET: Env.schema.string(),
  NODE_ENV: Env.schema.string.optional(),
});
