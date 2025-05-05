import db, { NewReservation } from "../db";
import { reservationTable } from "../db/schema";


export const CreateReservation = async (reservationData: NewReservation) => {
       let hostId = ""
       let propertyPrice = 0;
       const res = await fetch(`${Bun.env.API_GATEWAY_URL}/properties/${reservationData.propertyId}`)
       if(!res.ok){
        return Error(res.statusText)
       }else{
        await res.json().then((data) => {
            hostId = data.data.hostId;
            propertyPrice = data.data.pricePerNight;
        });
       }


       if(reservationData.tenantId == hostId) {
            throw new Error('You can not reserve your own listing');
        }
        // validate if dates is available 
        const checkInDate = new Date(reservationData.checkInDate);
        const checkOutDate = new Date(reservationData.checkOutDate);

        const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
        let totalPrice  = propertyPrice * nights;
        
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
