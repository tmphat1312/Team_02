import { Hono } from "hono";

export const registerServices = ({
  app,
  services,
}: {
  app: Hono;
  services: Hono[];
}) => {
  services.forEach((service) => {
    app.route("/", service);
  });
};
