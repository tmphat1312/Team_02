import { createMiddleware } from "hono/factory";
import { cloudinaryClient } from "../lib/cloudinary-client";

type Env = {
  Variables: {
    imageUrl: string;
  };
};

export function uploadImageMiddleware(options: {
  // maxFileSize: number;
  // allowedMimeTypes: string[];
  inputFieldName: string;
  // onError: (error: Error) => void;
  // onSuccess: (filePath: string) => void;
}) {
  const { inputFieldName } = options;

  return createMiddleware<Env>(async (c, next) => {
    const body = await c.req.parseBody();
    const file = body[inputFieldName] as File;

    const [res, err] = await cloudinaryClient.upload({
      file,
      folder: "Categories",
    });

    if (res) {
      c.set("imageUrl", res.secure_url);
    }

    if (err) {
      throw new Error(err.message);
    }

    await next();
  });
}
