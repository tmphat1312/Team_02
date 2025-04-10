import { Hono } from 'hono'
import { showRoutes } from "hono/dev";
import { logger } from "hono/logger";
import { consola } from "consola";
import { verificationRoute } from './routes/verification'



const app = new Hono()

app.use(logger(consola.info));

app.route('/', verificationRoute);

showRoutes(app);

export default {
  fetch: app.fetch,
  port: Bun.env.PORT || 3003,
};

