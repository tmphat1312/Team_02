import { ZodSchema } from "zod";

import { zValidator as zv } from "@hono/zod-validator";

import { badRequest } from "./json-helpers";

import type { ValidationTargets } from "hono";

export const zValidator = <
  T extends ZodSchema,
  Target extends keyof ValidationTargets
>(
  target: Target,
  schema: T
) =>
  zv(target, schema, (result, c) => {
    if (!result.success) {
      const firstError = result.error.errors.at(0)!;
      return badRequest(
        c,
        `${firstError.path.toString()} ${firstError.message}`
      );
    }
  });
