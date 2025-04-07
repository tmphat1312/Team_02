import { createMiddleware } from "hono/factory";
import { cloudinaryClient, UploadFolder } from "../lib/cloudinary-client";
import { internalServerError } from "../utils/json-helpers";

type Env = {
  Variables: {
    imageUrl: string;
  };
};

type UploadImageMiddlewareOptions = {
  inputFieldName: string;
  folder: UploadFolder;
};

export function uploadImageMiddleware(options: UploadImageMiddlewareOptions) {
  const { inputFieldName, folder } = options;

  return createMiddleware<Env>(async (c, next) => {
    const body = await c.req.parseBody();
    const file = body[inputFieldName] as File;

    const [data, err] = await cloudinaryClient.uploadImage({ file, folder });

    if (err) return internalServerError(c, err.message);
    if (data) c.set("imageUrl", data.secure_url);
    await next();
  });
}
