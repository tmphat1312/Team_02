import db, { NewReservation } from "../db";
import { reservationTable } from "../db/schema";


export const CreateReservation = async (reservationData: NewReservation) => {
       // [ get property detail ]
       const hostId = ""


       if(reservationData.tenantId == hostId) {
            throw new Error('You can not reserve your own listing');
        }
        // validate if dates is available 
        const checkInDate = new Date(reservationData.checkInDate);
        const checkOutDate = new Date(reservationData.checkOutDate);

       // [ calculate price ] USD/night
        const PROPERTY_PRICE = 3000;
        const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
        let totalPrice  = PROPERTY_PRICE * nights;
        
        const queryData = {
            ...reservationData,
            hostId: hostId,
            totalPrice: totalPrice.toString(),
            checkInDate: checkInDate,
            checkOutDate: checkOutDate,
            status: "Pending" as const,
        }

        const newReservation = await db.insert(reservationTable).values(queryData).returning();

        return {
            reservation: newReservation[0],
        }
}
