import { consola } from "consola";
import { Hono } from "hono";
import { showRoutes } from "hono/dev";
import { logger } from "hono/logger";

import { corsMiddleware } from "./middlewares/cors.js";
import { iamService } from "./services/iam.js";
import { internalService } from "./services/internal.js";
import { notificationService } from "./services/notification.js";
import { paymentService } from "./services/payment.js";
import { propertyService } from "./services/property.js";
import { reportingService } from "./services/reporting.js";
import { reservationService } from "./services/reservation.js";
import { userService } from "./services/user.js";
import { registerServices } from "./utils/register-services.js";

const app = new Hono();

app.use(logger(consola.info));
app.use("*", corsMiddleware);

registerServices({
  app,
  services: [
    iamService,
    propertyService,
    internalService,
    userService,
    reservationService,
    notificationService,
    paymentService,
    reportingService,
  ],
});

showRoutes(app);

export default app;
