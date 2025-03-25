import { createFactory, createMiddleware } from "hono/factory";
import { StatusCode } from "hono/utils/http-status";

import { NOT_FOUND, UNAUTHORIZED } from "../constants/http-status-codes";
import {
  NOT_FOUND as NOT_FOUND_TEXT,
  UNAUTHORIZED as UNAUTHORIZED_TEXT,
} from "../constants/http-status-phrases";

type Env = {
  Variables: {
    data: (data: unknown, meta?: unknown) => void;
    unauthorized: (errorMsg: string, meta?: unknown) => void;
    notFound: (errorMsg?: string) => void;
  };
  Bindings: {
    NODE_ENV: string;
  };
};

const defineResponseFunctions = createMiddleware<Env>(async (c, next) => {
  const returnData = (data: unknown, meta?: unknown) => {
    return c.json({
      data,
      error: null,
      metadata: meta ?? {},
    });
  };

  const returnError = (
    error: {
      message: string;
      statusCode: number;
      statusText: string;
    },
    meta?: unknown
  ) => {
    c.status(error.statusCode as StatusCode);
    return c.json({
      data: null,
      error: {
        message: error.message,
        statusCode: error.statusCode,
        statusText: error.statusText,
      },
      metadata: meta ?? {},
    });
  };

  c.set("data", returnData);

  c.set("unauthorized", (errorMsg = "Unauthorized", meta?: unknown) =>
    returnError(
      {
        message: errorMsg,
        statusCode: UNAUTHORIZED,
        statusText: UNAUTHORIZED_TEXT,
      },
      meta
    )
  );

  c.set("notFound", (errorMsg = "Resource Not Found", meta?: unknown) =>
    returnError(
      {
        message: errorMsg,
        statusCode: NOT_FOUND,
        statusText: NOT_FOUND_TEXT,
      },
      meta
    )
  );

  await next();
});

export const routeFactory = createFactory<Env>({
  initApp: (app) => {
    app.use(defineResponseFunctions);
  },
});
