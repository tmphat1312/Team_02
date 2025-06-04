import { Hono } from "hono";
import { proxyMiddleware } from "../middlewares/proxy.js";
import { only } from "../middlewares/only.js";

const route = new Hono();
const proxy = proxyMiddleware({
  target: process.env.REPORTING_SERVICE_URL ?? "http://localhost:3009",
});

route.get("/reporting*", only(["user"]), proxy);

export { route as reportingService };
