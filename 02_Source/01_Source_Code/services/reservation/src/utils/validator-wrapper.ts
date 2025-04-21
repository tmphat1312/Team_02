// file: validator-wrapper.ts
import { ZodSchema } from 'zod'
import type { ValidationTargets } from 'hono'
import { zValidator as zv } from '@hono/zod-validator'
import { badRequest } from './json-helpers'

export const zValidator = <T extends ZodSchema, Target extends keyof ValidationTargets>(
  target: Target,
  schema: T
) =>
  zv(target, schema, (result, c) => {
    if (!result.success) {
      return badRequest(c, result.error.errors[0].path.toString() + " " +  result.error.errors[0].message , result.error.name);
    }
  })

