import { Hono } from "hono";
import { proxyMiddleware } from "../middlewares/proxy.js";
import { only } from "../middlewares/only.js";

const route = new Hono();
const proxy = proxyMiddleware({
  target: process.env.PROPERTY_SERVICE_URL || "http://localhost:3005",
});

// Amenity Resource
route.get("/amenities*", proxy);
route.post("/amenities", only(["admin"]), proxy);
route.delete("/amenities/:id", only(["admin"]), proxy);

// Rule Resource
route.get("/rules*", proxy);
route.post("/rules", only(["admin"]), proxy);
route.delete("/rules/:id", only(["admin"]), proxy);

// Category Resource
route.get("/categories*", proxy);
route.post("/categories", only(["admin"]), proxy);
route.delete("/categories/:id", only(["admin"]), proxy);

// Property Resource
route.get("/properties*", proxy);
route.post("/properties", only(["host"]), proxy);

// Property Resource
route.post("/wishlists", only(["tenant"]), proxy);

export const propertyService = route;
