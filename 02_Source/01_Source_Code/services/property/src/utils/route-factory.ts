import { createFactory, createMiddleware } from "hono/factory";
import { StatusCode } from "hono/utils/http-status";

import { NOT_FOUND, UNAUTHORIZED } from "../constants/http-status-codes";
import {
  NOT_FOUND as NOT_FOUND_TEXT,
  UNAUTHORIZED as UNAUTHORIZED_TEXT,
} from "../constants/http-status-phrases";

type Env = {
  Variables: {
    data: (data: unknown) => void;
    unauthorized: (errorMsg: string) => void;
    notFound: (errorMsg?: string) => void;
  };
  Bindings: {
    NODE_ENV: string;
  };
};

const defineResponseFunctions = createMiddleware<Env>(async (c, next) => {
  const returnData = (data: unknown) => {
    return c.json({
      data,
      error: null,
    });
  };
  const returnError = (error: {
    message: string;
    statusCode: number;
    statusText: string;
  }) => {
    c.status(error.statusCode as StatusCode);
    return c.json({
      data: null,
      error: {
        message: error.message,
        statusCode: error.statusCode,
        statusText: error.statusText,
      },
    });
  };

  c.set("data", returnData);

  c.set("unauthorized", (errorMsg) =>
    returnError({
      message: errorMsg,
      statusCode: UNAUTHORIZED,
      statusText: UNAUTHORIZED_TEXT,
    })
  );

  c.set("notFound", (errorMsg = "Resource Not Found") =>
    returnError({
      message: errorMsg,
      statusCode: NOT_FOUND,
      statusText: NOT_FOUND_TEXT,
    })
  );

  await next();
});

export const routeFactory = createFactory<Env>({
  initApp: (app) => {
    app.use(defineResponseFunctions);
  },
});
