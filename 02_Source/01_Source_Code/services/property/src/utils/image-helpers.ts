import { Context } from "hono";

export const getImageUrlsFromContext = (c: Context): string[] => {
  const urls = c.get("imageUrls") as string;

  return urls
    ? urls
        .split(",")
        .map((url) => url.trim())
        .filter(Boolean)
    : [];
};
