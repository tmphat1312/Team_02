import { Review } from "@/app/typings/models";
import { mockHttpClient } from "@/lib/http-client";

export async function fetchPropertyReviews(id: number): Promise<Review[]> {
  return mockHttpClient
    .get(`/reviews?propertyId=${id}`)
    .then((res) => res.data);
}
