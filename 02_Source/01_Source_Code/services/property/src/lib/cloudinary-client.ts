import {
  v2 as cloudinary,
  UploadApiErrorResponse,
  UploadApiResponse,
} from "cloudinary";
import { calculateHashForBuffer } from "../utils/calculate-hash-for-buffer";

cloudinary.config({
  secure: true,
  api_key: Bun.env.CLOUDINARY_API_KEY,
  api_secret: Bun.env.CLOUDINARY_API_SECRET,
  cloud_name: Bun.env.CLOUDINARY_CLOUD_NAME,
});

type UploadOptions = {
  file: File;
  folder: "Categories" | "Amenities" | "Properties" | "Users";
  overwrite?: boolean;
};

export const cloudinaryClient = {
  upload: async function (options: UploadOptions) {
    const { file, folder, overwrite = false } = options;

    const fileArrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(fileArrayBuffer);
    const publicId = await calculateHashForBuffer(buffer);

    const uploadPRomise = new Promise((resolve) => {
      cloudinary.uploader
        .upload_stream(
          {
            public_id: publicId,
            folder,
            overwrite,
          },
          (err, data) => resolve(err || data)
        )
        .end(buffer);
    }) as Promise<UploadApiResponse | UploadApiErrorResponse | undefined>;

    const result = await uploadPRomise;

    if (isUploadError(result)) {
      return [null, result] as const;
    }
    if (isUploadSuccess(result)) {
      return [result, null] as const;
    }

    return [null, new Error("Unknown upload error")] as const;
  },
};

function isUploadError(result: unknown): result is UploadApiErrorResponse {
  return (result as UploadApiErrorResponse).http_code !== undefined;
}

function isUploadSuccess(result: unknown): result is UploadApiResponse {
  return (result as UploadApiResponse).secure_url !== undefined;
}
