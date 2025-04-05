import { createMiddleware } from "hono/factory";
import { badRequest } from "../utils/json-helpers";

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

    if (isNaN(page) || isNaN(pageSize)) {
      return badRequest(c, "Page and pageSize must be numbers");
    }

    c.set("pagination", {
      page: page,
      pageSize: Math.min(pageSize, MAX_PAGE_SIZE),
    });

    await next();
  }
);
