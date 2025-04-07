import { createMiddleware } from "hono/factory";
import { cloudinaryClient, UploadFolder } from "../lib/cloudinary-client";
import { internalServerError } from "../utils/json-helpers";

type Env = {
  Variables: {
    imageUrls: string;
  };
};

type UploadImageMiddlewareOptions = {
  inputFieldName: string;
  folder: UploadFolder;
};

export function uploadImagesMiddleware(options: UploadImageMiddlewareOptions) {
  const { inputFieldName, folder } = options;

  return createMiddleware<Env>(async (c, next) => {
    const body = await c.req.parseBody({ all: true });
    const files = body[inputFieldName] as File[];

    const [data, errs] = await cloudinaryClient.uploadImages({ files, folder });

    if (errs.length > 0) {
      const errorMessage = errs.map((err) => err.message).join(", ");
      return internalServerError(c, errorMessage);
    }

    if (data) {
      c.set("imageUrls", data.map((upload) => upload.secure_url).join(", "));
    }
    
    await next();
  });
}
