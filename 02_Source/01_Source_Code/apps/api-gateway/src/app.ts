import { Hono } from "hono";
import { logger } from "hono/logger";

import { consola } from "consola";

import { registerServices } from "./utils/register-services.js";

import { corsMiddleware } from "./middlewares/cors.js";

import { iamService } from "./services/iam.js";
import { internalService } from "./services/internal.js";
import { propertyService } from "./services/property.js";

const app = new Hono();

app.use(logger(consola.info));
app.use("*", corsMiddleware);

registerServices({
  app,
  services: [iamService, propertyService, internalService],
});

export default app;
