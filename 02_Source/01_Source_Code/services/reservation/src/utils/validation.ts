import { z } from "zod";

export const reservationSchema = z.object({
    propertyId: z.number().int().positive('Property ID is required'),
    checkInDate: z.string().nonempty('check in date is required').transform((str) => new Date(str)),
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

export const updateReservationSchema = z.object({
    id: z.number().int().positive('reservation id is required'),
    status: z.enum(['Pending', 'Confirmed', 'Paid'])
}).refine(data => data.status == 'Pending' || data.status == 'Confirmed' || data.status == 'Paid', {
    message: '[**status must be Pending, Confirmed or Paid value**]',
    path: ['status']
} )