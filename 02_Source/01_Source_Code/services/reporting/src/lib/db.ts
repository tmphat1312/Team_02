import { Pool } from "pg";

import { env } from "../env.js";

export const propertyClient = new Pool({
  connectionString: env.PROPERTY_DB_URL,
});

export const reservationClient = new Pool({
  connectionString: env.RESERVATION_DB_URL,
});

export const paymentClient = new Pool({
  connectionString: env.PAYMENT_DB_URL,
});
