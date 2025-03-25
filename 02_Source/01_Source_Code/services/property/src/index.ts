import { consola } from "consola";
import { Hono } from "hono";
import { showRoutes } from "hono/dev";
import { logger } from "hono/logger";

import { onError } from "./middlewares/on-error";

import { amenitiesRoute } from "./routes/amenities";
import { categoriesRoute } from "./routes/categories";
import { internalRoute } from "./routes/internal";
import { propertiesRoute } from "./routes/properties";

const app = new Hono();

app.use(logger(consola.info));

app.route("/", internalRoute);
app.route("/properties", propertiesRoute);
app.route("/categories", categoriesRoute);
app.route("/amenities", amenitiesRoute);

app.onError(onError);

showRoutes(app);

export default {
  fetch: app.fetch,
  port: Bun.env.PORT || 3000,
};
