import { createMiddleware } from "hono/factory";
import { badRequest } from "../utils/json-helpers";
import { ErrorCode } from "./error/error-codes";

type Env = {
  Variables: {
    pagination: {
      page: number;
      pageSize: number;
    };
  };
};

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;
const MAX_PAGE_SIZE = 100;

export const transformPaginationQuery = createMiddleware<Env>(
  async (c, next) => {
    const page = Number(c.req.query("page") || DEFAULT_PAGE);
    const pageSize = Number(c.req.query("pageSize") || DEFAULT_PAGE_SIZE);

    if (isNaN(page)) {
      return badRequest(c, "page must be a number.", ErrorCode.INVALID_PAGE);
    }

    if (isNaN(pageSize)) {
      return badRequest(
        c,
        "pageSize must be a number.",
        ErrorCode.INVALID_PAGE_SIZE
      );
    }

    c.set("pagination", {
      page: page,
      pageSize: Math.min(pageSize, MAX_PAGE_SIZE),
    });

    await next();
  }
);
