import { Review, ReviewWithTenant } from "@/typings/models";
import { fetchUserDetails } from "@/features/auth/data/fetch-user-details";
import { httpClient } from "@/lib/http-client";

export async function fetchPropertyReviews(
  propertyId: number
): Promise<ReviewWithTenant[]> {
  const reviews = await httpClient
    .get(`/reviews?propertyId=${propertyId}`)
    .then((res) => res.data.data);
  const reviewsWithTenant = await Promise.all(
    reviews.map(async (review: Review) => {
      const tenant = await fetchUserDetails(review.tenantId);
      return {
        ...review,
        tenant: tenant,
      };
    })
  );
  return reviewsWithTenant;
}
