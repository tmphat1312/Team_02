import { consola } from "consola";
import { Hono } from "hono";
import { showRoutes } from "hono/dev";
import { logger } from "hono/logger";

import { onError } from "./middlewares/on-error";

import { amenitiesRoute } from "./routes/amenities";
import { categoriesRoute } from "./routes/categories";
import { propertiesRoute } from "./routes/properties";

const app = new Hono();

app.use(logger(consola.info));

app.get("/", (c) => {
  return c.text("Hello from Property Service!");
});

app.get("/health", (c) => {
  const timestamp = new Date().toISOString();
  return c.json({ status: "OK", timestamp });
});

app.get("/status", (c) => {
  const timestamp = new Date().toISOString();
  return c.json({ message: "Service is running", timestamp });
});

app.route("/properties", propertiesRoute);
app.route("/categories", categoriesRoute);
app.route("/amenities", amenitiesRoute);

app.onError(onError);

showRoutes(app);

export default {
  fetch: app.fetch,
  port: Bun.env.PORT || 3000,
};
