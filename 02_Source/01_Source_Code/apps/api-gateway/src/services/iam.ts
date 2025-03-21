import { Hono } from "hono";
import { auth } from "../lib/auth.js";

const route = new Hono();

route.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw));

export const iamService = route;
