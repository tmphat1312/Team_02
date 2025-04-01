import { createFactory, createMiddleware } from "hono/factory";
import { ContentfulStatusCode } from "hono/utils/http-status";

import {
  BAD_REQUEST,
  CREATED,
  NOT_FOUND,
  OK,
  UNAUTHORIZED,
} from "../constants/http-status-codes";
import {
  BAD_REQUEST as BAD_REQUEST_TEXT,
  NOT_FOUND as NOT_FOUND_TEXT,
  UNAUTHORIZED as UNAUTHORIZED_TEXT,
} from "../constants/http-status-phrases";

type Env = {
  Variables: {
    ok: (data: unknown, meta?: unknown) => void;
    created: (data: unknown, meta?: unknown) => void;
    unauthorized: (errorMsg?: string) => void;
    notFound: (errorMsg?: string) => void;
    badRequest: (errorMsg?: string) => void;
  };
  Bindings: {
    NODE_ENV: string;
  };
};

const defineResponseFunctions = createMiddleware<Env>(async (c, next) => {
  const returnData =
    (statusCode: ContentfulStatusCode) => (data: unknown, meta?: unknown) =>
      c.json(
        { data, error: null, metadata: meta ?? {} },
        { status: statusCode }
      );

  const returnError = (error: {
    message: string;
    statusCode: ContentfulStatusCode;
    statusText: string;
  }) => {
    return c.json(
      {
        data: null,
        error: {
          message: error.message,
          statusCode: error.statusCode,
          statusText: error.statusText,
        },
        metadata: {},
      },
      { status: error.statusCode }
    );
  };

  c.set("ok", returnData(OK));
  c.set("created", returnData(CREATED));

  c.set("unauthorized", (errorMsg = "Unauthorized") =>
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

  c.set("badRequest", (errorMsg = "Bad Request") =>
    returnError({
      message: errorMsg,
      statusCode: BAD_REQUEST,
      statusText: BAD_REQUEST_TEXT,
    })
  );

  await next();
});

export const routeFactory = createFactory<Env>({
  initApp: (app) => {
    app.use(defineResponseFunctions);
  },
});
