import { routeFactory } from "../utils/route-factory";

const route = routeFactory.createApp();

route.post("/", (c) => {
  return c.text("Create Amenity");
});

export const amenitiesRoute = route;
