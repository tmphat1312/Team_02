import type { ErrorHandler } from "hono";
import { consola } from "consola";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { ErrorCode } from "../constants/error-codes";
import {
  DataResponse,
  ErrorResponse,
  MetadataResponse,
} from "../utils/json-helpers";

export const onError: ErrorHandler = (err, c) => {
  const env = c.env?.NODE_ENV || process.env?.NODE_ENV;
  const isProduction = env === "production";

  if (!isProduction) consola.error(err);

  const data: DataResponse = null;
  const error: ErrorResponse = {
    code: ErrorCode.INTERNAL_SERVER_ERROR,
    message: err.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    status: StatusCodes.INTERNAL_SERVER_ERROR,
    statusText: ReasonPhrases.INTERNAL_SERVER_ERROR,
  };
  const metadata: MetadataResponse = !isProduction
    ? {
        stack: err.stack,
        name: err.name,
        env,
        url: c.req.url,
      }
    : {};

  c.status(StatusCodes.INTERNAL_SERVER_ERROR);
  return c.json({
    data,
    error,
    metadata,
  });
};
