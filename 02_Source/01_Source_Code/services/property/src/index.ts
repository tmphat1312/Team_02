import { app } from "@getcronit/pylon";
import { showRoutes } from "hono/dev";
import { logger } from "hono/logger";

import { consola } from "consola";

import { onError } from "./middlewares/on-error";

import { amenitiesRoute } from "./routes/amenities";
import { categoriesRoute } from "./routes/categories";
import { Mutation, Query } from "./routes/graphql";
import { internalRoute } from "./routes/internal";
import { propertiesRoute } from "./routes/properties";

app.use(logger(consola.info));

app.route("/", internalRoute);
app.route("/properties", propertiesRoute);
app.route("/categories", categoriesRoute);
app.route("/amenities", amenitiesRoute);

app.onError(onError);

showRoutes(app);

export const graphql = { Query, Mutation };
export default {
  fetch: app.fetch,
  port: Bun.env.PORT || 3000,
};
