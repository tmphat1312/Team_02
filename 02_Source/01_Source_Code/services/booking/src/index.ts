import { serve } from "@hono/node-server";
import { Hono } from "hono";

// @ts-ignore
import { createPayment } from "./lib/payment-client.js";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.post("bookings/:id/payment", async (c) => {
  const { id } = c.req.param();
  const { amount, currency } = await c.req.json();
  console.log(`Booking ID: ${id}, Amount: ${amount}, Currency: ${currency}`);

  const response = await createPayment({
    userId: id,
    amount,
    currency,
  });

  return c.json({
    message: "Payment created successfully",
    response,
  });
});

serve(
  {
    fetch: app.fetch,
    port: 3006,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
