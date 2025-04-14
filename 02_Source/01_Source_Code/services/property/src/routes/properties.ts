import { Hono } from "hono";

import { ErrorCode } from "../constants/error-codes";

import { db } from "../db";
import { getInvalidIds } from "../db/query";
import {
  categoriesTable,
  amenitiesTable,
  rulesTable,
  propertiesTable,
  propertyImagesTable,
  propertyCategoriesTable,
  propertyAmenitiesTable,
  propertyRulesTable,
} from "../db/schema";

import { uploadImagesMiddleware } from "../middlewares/upload-images";

import {
  CreatePropertyInput,
  createPropertySchema,
} from "../schemas/properties";

import { badRequest, created } from "../utils/json-helpers";
import { getFirstZodError } from "../utils/zod-helpers";
import { getImageUrlsFromContext } from "../utils/image-helpers";

const route = new Hono<{
  Variables: {
    validatedProperty: CreatePropertyInput;
  };
}>();

route.post(
  "/",
  async (c, next) => {
    const formData = await c.req.formData();

    const formBody = {
      title: formData.get("title")?.toString() ?? "",
      description: formData.get("description")?.toString() ?? "",
      address: formData.get("address")?.toString() ?? "",
      latitude: formData.get("latitude")?.toString() ?? "",
      longitude: formData.get("longitude")?.toString() ?? "",
      pricePerNight: formData.get("pricePerNight")?.toString() ?? "",
      numberOfGuests: formData.get("numberOfGuests")?.toString() ?? "",
      numberOfBedrooms: formData.get("numberOfBedrooms")?.toString() ?? "",
      numberOfBeds: formData.get("numberOfBeds")?.toString() ?? "",
      numberOfBathrooms: formData.get("numberOfBathrooms")?.toString() ?? "",
      categories: formData.getAll("categories"),
      amenities: formData.getAll("amenities"),
      rules: formData.getAll("rules"),
    };

    const parseResult = createPropertySchema.safeParse(formBody);

    if (!parseResult.success) {
      const { errorMessage, errorCode } = getFirstZodError(parseResult.error);
      return badRequest(c, errorMessage, errorCode);
    }

    // Categories
    const invalidCategories = await getInvalidIds(
      categoriesTable,
      categoriesTable.id,
      parseResult.data.categories
    );

    if (invalidCategories.length > 0) {
      return badRequest(
        c,
        `Invalid category ID: ${invalidCategories.join(", ")}.`,
        ErrorCode.INVALID_CATEGORY_ID
      );
    }

    // Amenities
    const invalidAmenities = await getInvalidIds(
      amenitiesTable,
      amenitiesTable.id,
      parseResult.data.amenities
    );

    if (invalidAmenities.length > 0) {
      return badRequest(
        c,
        `Invalid amenity ID: ${invalidAmenities.join(", ")}.`,
        ErrorCode.INVALID_AMENITY_ID
      );
    }

    // Rules
    const invalidRules = await getInvalidIds(
      rulesTable,
      rulesTable.id,
      parseResult.data.rules
    );
    if (invalidRules.length > 0) {
      return badRequest(
        c,
        `Invalid rule ID: ${invalidRules.join(", ")}.`,
        ErrorCode.INVALID_RULE_ID
      );
    }

    // Images
    const imageFiles = formData.getAll("images");

    if (imageFiles.length < 5) {
      return badRequest(
        c,
        "images: There must be at least 5 images.",
        ErrorCode.MISSING_IMAGE
      );
    }

    const allAreImages = imageFiles.every((file) => {
      return file instanceof File && file.type.startsWith("image/");
    });

    if (!allAreImages) {
      return badRequest(
        c,
        "images: All uploaded files must be valid images.",
        ErrorCode.INVALID_IMAGE
      );
    }

    c.set("validatedProperty", parseResult.data);
    await next();
  },
  uploadImagesMiddleware({
    inputFieldName: "images",
    folder: "Properties",
  }),
  async (c) => {
    const { categories, amenities, rules, ...rest } =
      c.get("validatedProperty");
    const hostId = c.req.header("x-user-id")!;

    const property = {
      hostId,
      ...rest,
      pricePerNight: rest.pricePerNight.toFixed(2),
      isAvailable: true,
    };

    const [createdProperty] = await db
      .insert(propertiesTable)
      .values(property)
      .returning();

    const propertyId = createdProperty.id;

    // Images
    let insertedImages: { imageUrl: string }[] = [];
    const imageUrls = getImageUrlsFromContext(c);
    if (imageUrls.length > 0) {
      insertedImages = await db
        .insert(propertyImagesTable)
        .values(
          imageUrls.map((url: string) => ({
            propertyId,
            imageUrl: url,
          }))
        )
        .returning({ imageUrl: propertyImagesTable.imageUrl });
    }

    // Categories
    let insertedCategories: { categoryId: number }[] = [];
    if (categories.length > 0) {
      insertedCategories = await db
        .insert(propertyCategoriesTable)
        .values(
          categories.map((categoryId: number) => ({
            propertyId,
            categoryId,
          }))
        )
        .returning({ categoryId: propertyCategoriesTable.categoryId });
    }

    // Amenities
    let insertedAmenities: { amenityId: number }[] = [];
    if (amenities.length > 0) {
      insertedAmenities = await db
        .insert(propertyAmenitiesTable)
        .values(
          amenities.map((amenityId: number) => ({
            propertyId,
            amenityId,
          }))
        )
        .returning({ amenityId: propertyAmenitiesTable.amenityId });
    }

    // Rules
    let insertedRules: { ruleId: number }[] = [];
    if (rules.length > 0) {
      insertedRules = await db
        .insert(propertyRulesTable)
        .values(
          rules.map((ruleId: number) => ({
            propertyId,
            ruleId,
          }))
        )
        .returning({ ruleId: propertyRulesTable.ruleId });
    }

    // Result
    const { hostId: _removedHostId, ...sanitizedProperty } = createdProperty;

    return created(c, {
      property: {
        ...sanitizedProperty,
        pricePerNight: parseFloat(createdProperty.pricePerNight),
        images: insertedImages,
        categories: insertedCategories,
        amenities: insertedAmenities,
        rules: insertedRules,
      },
    });
  }
);

export const propertiesRoute = route;
