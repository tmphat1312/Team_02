import { z } from "zod";

export const reservationSchema = z.object({
    propertyId: z.number().int(),
    checkInDate: z.string().transform((str) => new Date(str)),
    checkOutDate: z.string().transform((str) => new Date(str)),
    numberOfAdults: z.number().int().positive('Adult count must be positive'),
    numberOfChildren: z.number().int().positive().optional(),
    numberOfInfants: z.number().int().positive().optional(),
    notes: z.string().optional(),
}).refine(data => data.checkOutDate > data.checkInDate, {
    message: 'must be after check-in date',
    path: ['Check-out date']
}).refine(data => data.checkInDate > new Date(), {
    message: 'can not be in the past',
    path: ['Check-in date']
})

export const reviewSchema = z.object({
    reservationId: z.number().int(),
    cleanliness: z.number().int(),
    accuracy: z.number().int(),
    communication: z.number().int(),
    location: z.number().int(),
})