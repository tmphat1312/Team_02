import { z } from "zod";

export const reservationSchema = z
  .object({
    tenantId: z.string(),
    hostId: z.string(),
    totalPrice: z
      .number()
      .min(0)
      .transform((val) => val.toString()),
    propertyId: z.number().int().positive(),
    checkInDate: z.string().transform((val) => new Date(val)),
    checkOutDate: z.string().transform((val) => new Date(val)),
    numberOfGuests: z.number().int().positive(),
    note: z.string().optional(),
  })
  .refine((data) => data.checkOutDate >= data.checkInDate, {
    message: "must be after check-in date",
    path: ["Check-out date"],
  })
  .refine((data) => data.checkInDate > new Date(), {
    message: "can not be in the past",
    path: ["Check-in date"],
  });

export const reviewSchema = z.object({
  reservationId: z.number().int(),
  propertyId: z.number().int(),
  tenantId: z.string(),
  cleanliness: z.number().int().min(1).max(5),
  accuracy: z.number().int().min(1).max(5),
  communication: z.number().int().min(1).max(5),
  location: z.number().int().min(1).max(5),
  content: z.string(),
});
