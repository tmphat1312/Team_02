import {
  v2 as cloudinary,
  UploadApiErrorResponse,
  UploadApiResponse,
} from "cloudinary";

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
  uploadImage,
  deleteImage,
};

export async function uploadImage(
  options: UploadOptions
): Promise<[UploadApiResponse | null, Error | null]> {
  const { file, folder, overwrite = false } = options;

  const fileArrayBuffer = await file.arrayBuffer();
  const public_id = `${normalizeFileName(file.name)}-${crypto.randomUUID()}`;

  const uploadPromise = new Promise((resolve) => {
    cloudinary.uploader
      .upload_stream(
        // prettier-ignore
        { public_id, folder, overwrite },
        (err, data) => resolve(err || data)
      )
      .end(Buffer.from(fileArrayBuffer));
  });

  const result = await uploadPromise;

  if (isUploadError(result)) {
    return [null, result] as const;
  }

  if (isUploadSuccess(result)) {
    return [result, null] as const;
  }

  return [null, new Error("Unknown upload error")] as const;
}

export async function deleteImage(secureUrl: string) {
  const publicId = extractPublicId(secureUrl);

  if (!publicId) {
    return [null, new Error("Invalid secure URL")] as const;
  }

  const deletePromise = new Promise((resolve) => {
    cloudinary.uploader.destroy(publicId, (err, data) => resolve(err || data));
  });
  const result = await deletePromise;

  if (isUploadError(result)) {
    return [null, result] as const;
  }

  if (isUploadSuccess(result)) {
    return [result, null] as const;
  }

  return [null, new Error("Unknown delete error")] as const;
}

function normalizeFileName(fileName: string) {
  return fileName
    .replaceAll(" ", "_")
    .split(".")
    .slice(0, -1)
    .join(".")
    .toLowerCase();
}

function extractPublicId(secureUrl: string) {
  const parts = secureUrl.split("/");
  const publicId = parts.slice(-2).join("/").split(".")[0];
  return publicId;
}

function isUploadError(result: unknown): result is UploadApiErrorResponse {
  return (result as UploadApiErrorResponse).http_code !== undefined;
}

function isUploadSuccess(result: unknown): result is UploadApiResponse {
  return (result as UploadApiResponse).secure_url !== undefined;
}
