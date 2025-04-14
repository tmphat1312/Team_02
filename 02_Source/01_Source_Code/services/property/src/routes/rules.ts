import { desc, eq } from "drizzle-orm";
import { Hono } from "hono";

import { ErrorCode } from "../constants/error-codes";

import { db } from "../db";
import { rulesTable } from "../db/schema";

import { transformPaginationQuery } from "../middlewares/transform-pagination-query";

import { badRequest, created, noContent, ok } from "../utils/json-helpers";

const route = new Hono();

route.get("/", transformPaginationQuery, async (c) => {
  const { page, pageSize } = c.var.pagination;
  const offset = (page - 1) * pageSize;
  const type = c.req.query("type");

  const whereClause = type
    ? eq(rulesTable.type, type as "common" | "custom")
    : undefined;

  const getRulesQuery = db
    .select()
    .from(rulesTable)
    .where(whereClause)
    .limit(pageSize)
    .offset(offset)
    .orderBy(desc(rulesTable.id));
  const countRulesQuery = db.$count(rulesTable, whereClause);

  const [rules, totalItems] = await Promise.all([
    getRulesQuery,
    countRulesQuery,
  ]);

  const currentPage = page;
  const totalPages = Math.ceil(totalItems / pageSize);

  return ok(c, {
    data: rules,
    meta: {
      pagination: {
        currentPage,
        totalItems,
        totalPages,
        pageSize,
      },
    },
  });
});

route.post(
  "/",
  async (c, next) => {
    const { name } = await c.req.json<typeof rulesTable.$inferInsert>();

    const [existingRule] = await db
      .select({ id: rulesTable.id })
      .from(rulesTable)
      .where(eq(rulesTable.name, name));

    if (existingRule) {
      return badRequest(
        c,
        "Rule already exists",
        ErrorCode.RULE_ALREADY_EXISTS
      );
    }

    await next();
  },
  async (c) => {
    const { name, description, type } = await c.req.json<
      typeof rulesTable.$inferInsert
    >();

    const [createdRule] = await db
      .insert(rulesTable)
      .values({ name, description, type })
      .returning();

    return created(c, {
      data: createdRule,
    });
  }
);

route.delete("/:id", async (c) => {
  const { id } = c.req.param();
  await db.delete(rulesTable).where(eq(rulesTable.id, Number(id)));
  return noContent(c);
});

export const rulesRoute = route;
