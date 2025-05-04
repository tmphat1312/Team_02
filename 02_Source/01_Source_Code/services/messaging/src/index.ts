import { Hono } from 'hono'
import { showRoutes } from "hono/dev";
import { logger } from "hono/logger";
import { consola } from "consola";
import { conversationRoute } from './routes/conversation';



const app = new Hono()

app.use(logger(consola.info));

app.route('/conversations', conversationRoute);

showRoutes(app);

export default {
  fetch: app.fetch,
  port: Bun.env.PORT || 5002,
};

