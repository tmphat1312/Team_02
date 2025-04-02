import { createMiddleware } from "hono/factory";
import { cloudinaryClient } from "../lib/cloudinary-client";

type Env = {
  Variables: {
    imageUrl: string;
  };
};

type UploadImageMiddlewareOptions = {
  inputFieldName: string;
  folder: "Categories" | "Amenities" | "Properties" | "Users";
};

export function uploadImageMiddleware(options: UploadImageMiddlewareOptions) {
  const { inputFieldName, folder } = options;

  return createMiddleware<Env>(async (c, next) => {
    const body = await c.req.parseBody();
    const file = body[inputFieldName] as File;

    const [data, err] = await cloudinaryClient.upload({ file, folder });

    if (data) c.set("imageUrl", data.secure_url);
    if (err) throw new Error(err.message);

    await next();
  });
}
