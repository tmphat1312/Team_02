import { eq } from "drizzle-orm";
import db, { NewReview } from "../db";
import { reservationTable, reviewTable } from "../db/schema";

export const createReview = async (reviewData: NewReview) => {
    const reservation =  await db.select().from(reservationTable).where(eq(reservationTable.id, reviewData.reservationId));
    if(reservation.length <= 0){
        return Error("Reservation does not exist");
    }

    if(reviewData.tenantId != reservation[0].tenantId){
        return Error("The tenant Id provided does not match the tenant associated with the reservation");
    }

    const newReview =  await db.insert(reviewTable).values({
        ...reviewData,
        propertyId: reservation[0].propertyId,
    }).returning();
    return {
        success: true,
        message: newReview
    };
}

export const getReviewById = async (propertyId: number) => {
    console.log(`get reviews with id --> ${propertyId}`);
    const reviews = await db.select().from(reviewTable).where(eq(reviewTable.propertyId, propertyId));
    console.log(reviews);
    return reviews;
}