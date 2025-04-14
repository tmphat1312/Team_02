import { z } from "zod";

import { ErrorCode } from "../constants/error-codes";

const zTextField = function (
  label: string,
  {
    errorCode = {
      missing: `MISSING_${label.toUpperCase().replace(/ /g, "_")}`,
    },
  }: {
    errorCode?: { missing: string };
  } = {}
) {
  return z.string().superRefine((val, ctx) => {
    if (val === undefined || val === null || val === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `${label} is required.`,
        params: { errorCode: errorCode.missing },
      });
      return;
    }
  });
};

const zNumberField = function (
  label: string,
  {
    min,
    nonNegative = false,
    integer = false,
    errorCode = {
      missing: `MISSING_${label.toUpperCase().replace(/ /g, "_")}`,
      invalid: `INVALID_${label.toUpperCase().replace(/ /g, "_")}`,
    },
  }: {
    min?: number;
    nonNegative?: boolean;
    integer?: boolean;
    errorCode?: { missing: string; invalid: string };
  } = {}
) {
  return z
    .any()
    .superRefine((val, ctx) => {
      if (val === undefined || val === null || val === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `${label} is required.`,
          params: { errorCode: errorCode.missing },
        });
        return;
      }

      const strVal = val.toString();
      const num = Number(strVal);

      if (isNaN(num)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `${label} must be a number.`,
          params: { errorCode: errorCode.invalid },
        });
        return;
      }

      if (min !== undefined && num < min) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `${label} must be at least ${min}.`,
          params: { errorCode: errorCode.invalid },
        });
      }

      if (nonNegative && num < 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `${label} must be non-negative.`,
          params: { errorCode: errorCode.invalid },
        });
      }

      if (integer && num % 1 !== 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `${label} must be an integer.`,
          params: { errorCode: errorCode.invalid },
        });
      }
    })
    .transform((val) => Number(val));
};

export const createPropertySchema = z.object({
  title: zTextField("Title", {
    errorCode: {
      missing: ErrorCode.MISSING_TITLE,
    },
  }),

  description: zTextField("Description", {
    errorCode: {
      missing: ErrorCode.MISSING_DESCRIPTION,
    },
  }),

  address: zTextField("Address", {
    errorCode: {
      missing: ErrorCode.MISSING_ADDRESS,
    },
  }),

  latitude: zNumberField("Latitude", {
    errorCode: {
      missing: ErrorCode.MISSING_LATITUDE,
      invalid: ErrorCode.INVALID_LATITUDE,
    },
  }),
  longitude: zNumberField("Longitude", {
    errorCode: {
      missing: ErrorCode.MISSING_LONGITUDE,
      invalid: ErrorCode.INVALID_LONGITUDE,
    },
  }),

  pricePerNight: zNumberField("Price per night", {
    nonNegative: true,
    errorCode: {
      missing: ErrorCode.MISSING_PRICE_PER_NIGHT,
      invalid: ErrorCode.INVALID_PRICE_PER_NIGHT,
    },
  }),

  numberOfGuests: zNumberField("Number of guests", {
    min: 1,
    integer: true,
    errorCode: {
      missing: ErrorCode.MISSING_NUMBER_OF_GUESTS,
      invalid: ErrorCode.INVALID_NUMBER_OF_GUESTS,
    },
  }),

  numberOfBedrooms: zNumberField("Number of bedrooms", {
    nonNegative: true,
    integer: true,
    errorCode: {
      missing: ErrorCode.MISSING_NUMBER_OF_BEDROOMS,
      invalid: ErrorCode.INVALID_NUMBER_OF_BEDROOMS,
    },
  }),

  numberOfBeds: zNumberField("Number of beds", {
    nonNegative: true,
    integer: true,
    errorCode: {
      missing: ErrorCode.MISSING_NUMBER_OF_BEDS,
      invalid: ErrorCode.INVALID_NUMBER_OF_BEDS,
    },
  }),

  numberOfBathrooms: zNumberField("Number of bathrooms", {
    nonNegative: true,
    integer: true,
    errorCode: {
      missing: ErrorCode.MISSING_NUMBER_OF_BATHROOMS,
      invalid: ErrorCode.INVALID_NUMBER_OF_BATHROOMS,
    },
  }),

  categories: z.array(
    zNumberField("Category ID", {
      integer: true,
      errorCode: {
        missing: ErrorCode.MISSING_CATEGORY_ID,
        invalid: ErrorCode.INVALID_CATEGORY_ID,
      },
    })
  ),
  amenities: z.array(
    zNumberField("Amenity ID", {
      integer: true,
      errorCode: {
        missing: ErrorCode.MISSING_AMENITY_ID,
        invalid: ErrorCode.INVALID_AMENITY_ID,
      },
    })
  ),
  rules: z.array(
    zNumberField("Rule ID", {
      integer: true,
      errorCode: {
        missing: ErrorCode.MISSING_RULE_ID,
        invalid: ErrorCode.INVALID_RULE_ID,
      },
    })
  ),
});

export type CreatePropertyInput = z.infer<typeof createPropertySchema>;
