import { desc, eq, and, gte, lte, inArray, count } from "drizzle-orm";
import { Hono } from "hono";

import { ErrorCode } from "../constants/error-codes";
import { CATEGORY_NEW_ID } from "../constants/categories";

import { db } from "../db";
import { isValidId, getInvalidIds } from "../db/query";
import {
  categoriesTable,
  amenitiesTable,
  rulesTable,
  propertiesTable,
  propertyImagesTable,
  propertyCategoriesTable,
  propertyAmenitiesTable,
  propertyRulesTable,
  propertiesWithImagesView,
} from "../db/schema";

import { transformPaginationQuery } from "../middlewares/transform-pagination-query";
import { uploadImagesMiddleware } from "../middlewares/upload-images";

import {
  CreatePropertyInput,
  createPropertySchema,
} from "../schemas/properties";

import { badRequest, created, notFound, ok } from "../utils/json-helpers";
import { getFirstZodError } from "../utils/zod-helpers";
import { getImageUrlsFromContext } from "../utils/image-helpers";
import {
  calculateOffset,
  calculateTotalPages,
} from "../utils/pagination-calculators";

const route = new Hono<{
  Variables: {
    validatedProperty: CreatePropertyInput;
  };
}>();

route.get("/", transformPaginationQuery, async (c) => {
  const { page, pageSize } = c.var.pagination;
  const offset = calculateOffset({ page, pageSize });

  // Input processing
  const priceMin = c.req.query("priceMin");
  const priceMax = c.req.query("priceMax");
  const lat = parseFloat(c.req.query("lat") ?? "");
  const lng = parseFloat(c.req.query("lng") ?? "");
  const noBedroomsMin = parseInt(c.req.query("noBedroomsMin") ?? "");
  const noBedsMin = parseInt(c.req.query("noBedsMin") ?? "");
  const noBathroomsMin = parseInt(c.req.query("noBathroomsMin") ?? "");
  const noGuestsMin = parseInt(c.req.query("noGuestsMin") ?? "");

  const categoryIdStr = c.req.query("categoryId");
  const categoryId = categoryIdStr ? parseInt(categoryIdStr) : 0;

  const amenityIdsStr = c.req.query("amenityIds");
  const amenityIds = amenityIdsStr
    ? amenityIdsStr.split(",").map((id) => parseInt(id))
    : undefined;

  if (categoryIdStr) {
    const isValidCategory = await isValidId(
      categoriesTable,
      categoriesTable.id,
      categoryId
    );

    if (!isValidCategory) {
      return badRequest(
        c,
        `Invalid category ID: ${categoryId}.`,
        ErrorCode.INVALID_CATEGORY_ID
      );
    }
  }

  if (amenityIdsStr) {
    const invalidAmenities = await getInvalidIds(
      amenitiesTable,
      amenitiesTable.id,
      amenityIds!
    );

    if (invalidAmenities.length > 0) {
      return badRequest(
        c,
        `Invalid amenity ID: ${invalidAmenities.join(", ")}.`,
        ErrorCode.INVALID_AMENITY_ID
      );
    }
  }

  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

  // Filter
  const buildPropertyFilter = () => {
    const filters = [];

    filters.push(eq(propertiesWithImagesView.isAvailable, true));

    if (priceMin) {
      filters.push(gte(propertiesWithImagesView.pricePerNight, priceMin));
    }

    if (priceMax) {
      filters.push(lte(propertiesWithImagesView.pricePerNight, priceMax));
    }

    if (!isNaN(noBedroomsMin)) {
      filters.push(
        gte(propertiesWithImagesView.numberOfBedrooms, noBedroomsMin)
      );
    }

    if (!isNaN(noBedsMin)) {
      filters.push(gte(propertiesWithImagesView.numberOfBeds, noBedsMin));
    }

    if (!isNaN(noBathroomsMin)) {
      filters.push(
        gte(propertiesWithImagesView.numberOfBathrooms, noBathroomsMin)
      );
    }

    if (!isNaN(noGuestsMin)) {
      filters.push(gte(propertiesWithImagesView.numberOfGuests, noGuestsMin));
    }

    if (!isNaN(lat) && !isNaN(lng)) {
      filters.push(
        and(
          gte(propertiesWithImagesView.latitude, lat - 0.1),
          lte(propertiesWithImagesView.latitude, lat + 0.1),
          gte(propertiesWithImagesView.longitude, lng - 0.1),
          lte(propertiesWithImagesView.longitude, lng + 0.1)
        )
      );
    }

    if (categoryIdStr) {
      if (categoryId === CATEGORY_NEW_ID) {
        filters.push(gte(propertiesWithImagesView.createdAt, threeMonthsAgo));
      } else {
        filters.push(
          inArray(
            propertiesWithImagesView.id,
            db
              .select({ propertyId: propertyCategoriesTable.propertyId })
              .from(propertyCategoriesTable)
              .where(eq(propertyCategoriesTable.categoryId, categoryId))
          )
        );
      }
    }

    if (amenityIdsStr) {
      filters.push(
        inArray(
          propertiesWithImagesView.id,
          db
            .select({ propertyId: propertyAmenitiesTable.propertyId })
            .from(propertyAmenitiesTable)
            .where(inArray(propertyAmenitiesTable.amenityId, amenityIds!))
            .groupBy(propertyAmenitiesTable.propertyId)
            .having(
              eq(count(propertyAmenitiesTable.amenityId), amenityIds!.length)
            )
        )
      );
    }

    return and(...filters);
  };

  // Query
  const [properties, totalItems] = await Promise.all([
    db
      .select()
      .from(propertiesWithImagesView)
      .where(buildPropertyFilter())
      .orderBy(desc(propertiesWithImagesView.id))
      .limit(pageSize)
      .offset(offset),

    db
      .select({ count: count(propertiesWithImagesView.id) })
      .from(propertiesWithImagesView)
      .where(buildPropertyFilter())
      .then((res) => Number(res[0]?.count ?? 0)),
  ]);

  // Modify result
  const propertiesWithParsedPrices = properties.map(
    ({ isAvailable, ...property }) => ({
      ...property,
      pricePerNight: parseFloat(property.pricePerNight),
    })
  );

  // Pagination
  const currentPage = page;
  const totalPages = calculateTotalPages({
    totalItems,
    pageSize,
  });

  // Result
  return ok(c, {
    data: propertiesWithParsedPrices,
    meta: {
      pagination: {
        currentPage,
        totalItems,
        totalPages,
        pageSize,
      },
    },
  });
});

route.get("/host/:hostId", async (c) => {
  const hostId = c.req.param("hostId");
  const properties = await db
    .select()
    .from(propertiesWithImagesView)
    .where(eq(propertiesWithImagesView.hostId, hostId))
    .orderBy(desc(propertiesWithImagesView.createdAt));
  const propertiesWithParsedPrices = properties.map(
    ({ isAvailable, ...property }) => ({
      ...property,
      pricePerNight: parseFloat(property.pricePerNight),
    })
  );
  return ok(c, propertiesWithParsedPrices);
});

route.get("/:id", async (c) => {
  // Input processing
  const propertyIdStr = c.req.param("id");
  const propertyId = parseInt(propertyIdStr);

  if (isNaN(propertyId)) {
    return badRequest(
      c,
      `Invalid property ID: ${propertyIdStr}.`,
      ErrorCode.INVALID_PROPERTY_ID
    );
  }

  // Query
  const propertyRow = await db
    .select()
    .from(propertiesWithImagesView)
    .where(eq(propertiesWithImagesView.id, propertyId))
    .limit(1);

  const property = propertyRow[0];

  if (!property) {
    return notFound(c, `Property not found.`, ErrorCode.PROPERTY_NOT_FOUND);
  }

  // Result
  return ok(c, {
    ...property,
    pricePerNight: parseFloat(property.pricePerNight),
  });
});

route.get("/:id/categories", async (c) => {
  const propertyIdStr = c.req.param("id");
  const propertyId = parseInt(propertyIdStr);

  const categories = await db
    .select({
      id: categoriesTable.id,
      name: categoriesTable.name,
      description: categoriesTable.description,
      imageUrl: categoriesTable.imageUrl,
      createdAt: categoriesTable.createdAt,
      updatedAt: categoriesTable.updatedAt,
    })
    .from(propertyCategoriesTable)
    .leftJoin(
      categoriesTable,
      eq(categoriesTable.id, propertyCategoriesTable.categoryId)
    )
    .where(eq(propertyCategoriesTable.propertyId, propertyId));

  return ok(c, categories);
});

route.get("/:id/amenities", async (c) => {
  const propertyIdStr = c.req.param("id");
  const propertyId = parseInt(propertyIdStr);
  const amenities = await db
    .select({
      id: amenitiesTable.id,
      name: amenitiesTable.name,
      description: amenitiesTable.description,
      imageUrl: amenitiesTable.imageUrl,
      createdAt: amenitiesTable.createdAt,
      updatedAt: amenitiesTable.updatedAt,
    })
    .from(propertyAmenitiesTable)
    .leftJoin(
      amenitiesTable,
      eq(amenitiesTable.id, propertyAmenitiesTable.amenityId)
    )
    .where(eq(propertyAmenitiesTable.propertyId, propertyId));
  return ok(c, amenities);
});

route.get("/:id/rules", async (c) => {
  const propertyIdStr = c.req.param("id");
  const propertyId = parseInt(propertyIdStr);
  const rules = await db
    .select({
      id: rulesTable.id,
      name: rulesTable.name,
      description: rulesTable.description,
      createdAt: rulesTable.createdAt,
      updatedAt: rulesTable.updatedAt,
    })
    .from(propertyRulesTable)
    .leftJoin(rulesTable, eq(rulesTable.id, propertyRulesTable.ruleId))
    .where(eq(propertyRulesTable.propertyId, propertyId));
  return ok(c, rules);
});

route.post(
  "/",
  async (c, next) => {
    const formData = await c.req.formData();

    const formBody = {
      title: formData.get("title") ?? "",
      description: formData.get("description") ?? "",
      address: formData.get("address") ?? "",
      latitude: formData.get("latitude") ?? "",
      longitude: formData.get("longitude") ?? "",
      pricePerNight: formData.get("pricePerNight") ?? "",
      numberOfGuests: formData.get("numberOfGuests") ?? "",
      numberOfBedrooms: formData.get("numberOfBedrooms") ?? "",
      numberOfBeds: formData.get("numberOfBeds") ?? "",
      numberOfBathrooms: formData.get("numberOfBathrooms") ?? "",
      categories: JSON.parse((formData.getAll("categories") ?? []).toString()),
      amenities: JSON.parse((formData.getAll("amenities") ?? []).toString()),
      rules: JSON.parse((formData.getAll("rules") ?? []).toString()),
      customRules: JSON.parse(
        (formData.getAll("customRules") ?? []).toString()
      ),
    };

    const parseResult = createPropertySchema.safeParse(formBody);

    if (!parseResult.success) {
      const { errorMessage, errorCode } = getFirstZodError(parseResult.error);
      return badRequest(c, errorMessage, errorCode);
    }

    // Categories
    const invalidCategories: number[] = [];

    if (parseResult.data.categories.includes(CATEGORY_NEW_ID)) {
      invalidCategories.push(CATEGORY_NEW_ID);
    }

    const invalidDbCategories = await getInvalidIds(
      categoriesTable,
      categoriesTable.id,
      parseResult.data.categories
    );

    invalidCategories.push(...invalidDbCategories);

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
    const imageFiles = formData.getAll("images") || [];

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
    const { categories, amenities, rules, customRules, ...rest } =
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

    // Custom rules (custom rules are strings, if they are present insert them to the rules table and link them to the property)
    if (customRules.length > 0) {
      const customRuleIds = await db
        .insert(rulesTable)
        .values(
          customRules.map((rule: string) => ({
            name: rule,
            description: "",
          }))
        )
        .returning({ id: rulesTable.id });

      insertedRules = await db
        .insert(propertyRulesTable)
        .values(
          customRuleIds.map((ruleId: { id: number }) => ({
            propertyId,
            ruleId: ruleId.id,
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
