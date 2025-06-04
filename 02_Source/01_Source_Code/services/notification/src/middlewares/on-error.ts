import type { ErrorHandler } from "hono";
import { internalServerError } from "../utils/json-helpers";

export const onError: ErrorHandler = (err, c) => {
  console.log(err);
  return internalServerError(c);
};
