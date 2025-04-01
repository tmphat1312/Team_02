import { uploadImageMiddleware } from "../middlewares/upload-image";
import { routeFactory } from "../utils/route-factory";

const route = routeFactory.createApp();

route.post(
  "/",
  uploadImageMiddleware({
    inputFieldName: "file",
  }),
  (c) => {
    return c.text(`Create Category ${c.var.imageUrl}`);
  }
);

export const categoriesRoute = route;
