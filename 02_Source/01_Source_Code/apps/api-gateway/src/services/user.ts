import { Hono } from "hono";

import { dbClient } from "../lib/db.js";
import { forbidden, notFound, ok } from "../utils/json-helpers.js";
import { only } from "../middlewares/only.js";

const route = new Hono();

route.get("/users/:id", async (c) => {
  const { id } = c.req.param();
  const { rows } = await dbClient.query(
    `SELECT * FROM public.user WHERE id = $1`,
    [id]
  );
  const user = rows[0];

  if (!user) {
    return notFound(c, "User not found");
  }

  return ok(c, {
    data: user,
  });
});

route.post(
  "/users/:id/host",
  only(["tenant"]),
  async (c, next) => {
    const { id } = c.get("user");
    if (id !== c.req.param("id")) {
      return forbidden(c, "You are not allowed to perform this action");
    }
    await next();
  },
  async (c) => {
    const { id } = c.req.param();
    const { rows } = await dbClient.query(
      `UPDATE public.user SET role = 'host' WHERE id = $1 RETURNING id, name, email, role`,
      [id]
    );
    const user = rows[0];

    if (!user) {
      return notFound(c, "User not found");
    }

    return ok(c, {
      data: user,
    });
  }
);

export const userService = route;
