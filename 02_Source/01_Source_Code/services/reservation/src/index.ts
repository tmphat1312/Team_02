import { Hono } from 'hono'
import { logger } from 'hono/logger'
import reservation from './routes/reservation'
import { onError } from './middleware/on-error'
import reviewRoute from './routes/review'
const app = new Hono()

app.use(logger())

app.get('/', (c) => {
  return c.text('Welcome to reservation service!')
})

app.route('/reservation',reservation);
app.route('/reviews', reviewRoute);

app.onError(onError);

export default {
  fetch: app.fetch,
  port: Bun.env.PORT ?? 3006
}
