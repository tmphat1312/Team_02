import type { ErrorHandler } from "hono";
import type { StatusCode } from "hono/utils/http-status";
import { consola } from "consola";

import { INTERNAL_SERVER_ERROR, OK } from "../constants/http-status-codes";

export const onError: ErrorHandler = (err, c) => {
  const currentStatus =
    "status" in err ? (err.status as StatusCode) : c.newResponse(null).status;
  const statusCode =
    currentStatus !== OK ? currentStatus : INTERNAL_SERVER_ERROR;
  const env = c.env?.NODE_ENV || process.env?.NODE_ENV;

  consola.error(err);

  c.status(statusCode as StatusCode);
  return c.json({
    status: "Not OK!",
    data: null,
    error: {
      statusCode,
      message: err.message,
      stack: env === "production" ? undefined : err.stack,
    },
  });
};
