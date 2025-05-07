import { Hono } from "hono";
import { CreateReservation, GetReservationAvailable } from "../services/reservation-services";
import { badRequest, created, ok } from "../utils/json-helpers";
import { reservationSchema } from "../utils/validation";
import { zValidator } from "../utils/validator-wrapper";


const reservationRoute = new Hono();

reservationRoute.post('/', zValidator('json', reservationSchema) ,async (c) => {
    const { propertyId, checkInDate, checkOutDate, numberOfAdults, numberOfChildren, numberOfInfants } = c.req.valid('json');
    const tenantId = c.req.header("x-user-id")!;
    const newReservation = await CreateReservation(
        {
            propertyId: propertyId,
            checkInDate: checkInDate,
            checkOutDate: checkOutDate,
            numberOfAdults: numberOfAdults,
            numberOfChildren: numberOfChildren,
            numberOfInfants: numberOfInfants,
            tenantId: tenantId,
            totalPrice: "",
            hostId: "",
        })
    if(newReservation instanceof Error){
        return badRequest(c, newReservation.message, newReservation.name);
    }
    return created(c, newReservation);
})


reservationRoute.get('/available', async(c) => {
    const propertyId = c.req.queries('propertyId');
    if(!propertyId){
        return badRequest(c, "propertyId is required");
    }
    const availableReservations = await GetReservationAvailable(parseInt(propertyId[0]))
    if(availableReservations instanceof Error){
        return badRequest(c, availableReservations.message, availableReservations.name);
    }
    return ok(c, availableReservations);
})

export default reservationRoute;