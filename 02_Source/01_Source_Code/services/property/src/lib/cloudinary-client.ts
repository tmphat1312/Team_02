import {
  v2 as cloudinary,
  UploadApiErrorResponse,
  UploadApiResponse,
} from "cloudinary";
import consola from "consola";
import { limitFunction } from "p-limit";

cloudinary.config({
  secure: true,
  api_key: Bun.env.CLOUDINARY_API_KEY,
  api_secret: Bun.env.CLOUDINARY_API_SECRET,
  cloud_name: Bun.env.CLOUDINARY_CLOUD_NAME,
});

const UPLOAD_FOLDERS = ["Categories", "Amenities", "Properties", "Users"];
export type UploadFolder = (typeof UPLOAD_FOLDERS)[number];

export const cloudinaryClient = {
  uploadImage,
  deleteImage,
  uploadImages,
  deleteImages,
};

type Success<T> = [T, null];
type Failure<T> = [null, T];

type UploadImageOptions = {
  file: File;
  folder: UploadFolder;
  overwrite?: boolean;
};

export async function uploadImage(
  options: UploadImageOptions
): Promise<Success<UploadApiResponse> | Failure<Error>> {
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
    consola.error("Upload error:", result);
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

type UploadImagesOptions = {
  files: File[];
  folder: UploadFolder;
  overwrite?: boolean;
};

export async function uploadImages(options: UploadImagesOptions) {
  const { files, folder, overwrite = false } = options;

  const limitedUploadFunction = limitFunction(
    (file: File) => uploadImage({ file, folder, overwrite }),
    { concurrency: 5 }
  );

  const uploadPromises = files.map((file) => limitedUploadFunction(file));
  const results = await Promise.all(uploadPromises);
  const successfulUploads = results
    .filter((result) => result[0] !== null)
    .map((result) => result[0]);
  const errors = results
    .filter((result) => result[1] !== null)
    .map((result) => result[1]);

  return [successfulUploads, errors] as const;
}

export async function deleteImages(secureUrls: string[]) {
  const limitedDeleteFunction = limitFunction(
    (secureUrl: string) => deleteImage(secureUrl),
    { concurrency: 5 }
  );
  const deletePromises = secureUrls.map((secureUrl) =>
    limitedDeleteFunction(secureUrl)
  );
  const results = await Promise.all(deletePromises);
  const successfulDeletes = results
    .filter((result) => result[0] !== null)
    .map((result) => result[0]);
  const errors = results
    .filter((result) => result[1] !== null)
    .map((result) => result[1]);
  return [successfulDeletes, errors] as const;
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
