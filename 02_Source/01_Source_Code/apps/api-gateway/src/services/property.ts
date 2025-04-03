import { Hono } from "hono";
import { proxyMiddleware } from "../middlewares/proxy.js";

const route = new Hono();
const proxy = proxyMiddleware({
  target: process.env.PROPERTY_SERVICE_URL || "http://localhost:3005",
});

route.use("/graphql", proxy);
route.use("/amenities*", proxy);
route.use("/rules*", proxy);
route.use("/categories*", proxy);

export const propertyService = route;
