import { Hono } from "hono";
import { zValidator } from "../utils/validator-wrapper";
import { reviewSchema } from "../utils/validation";
import { createReview, getReviewById } from "../services/review-services";
import { badRequest, created, internalServerError, ok } from "../utils/json-helpers";

const reviewRoute = new Hono();

reviewRoute.get('/', async (c) => {
    const propertyId = c.req.queries('propertyId')
    if (!propertyId) {
        return badRequest(c, "Property ID is required", "InvalidParameter");
    }
    const results = await getReviewById(parseInt(propertyId[0], 10));
    return ok(c, results);
})

reviewRoute.post('/',zValidator('json', reviewSchema), async(c) => {
    const tenantId = c.req.header('x-user-id');
    const {reservationId, cleanliness, communication, accuracy, location} = c.req.valid('json');
    if(tenantId == undefined){
        return internalServerError(c, "null value in column \"tenantId\" of relation \"reviews\" violates not-null constraint")
    }
    const resp = await createReview({
        reservationId: reservationId,
        cleanliness: cleanliness,
        communication: communication,
        accuracy: accuracy,
        location: location,
        tenantId: tenantId,
        propertyId: -1,
    })
    if(!resp.success){
        return badRequest(c, resp.message.toString())
    }else{
        return created(c, resp.message)
    }
})



export default reviewRoute;