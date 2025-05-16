import { Property, PropertyWithReviews, Review } from "@/typings/models";
import { http } from "@/lib/http";
import { calculateAvgRating } from "@/lib/utils";

export async function fetchHostListings({
  hostId,
}: {
  hostId: string;
}): Promise<PropertyWithReviews[]> {
  const {
    data: { data: properties },
  } = await http.get(`/properties/host/${hostId}`);

  const propertiesWithReviewsPromises = properties.map(
    async (property: Property) => {
      const params = new URLSearchParams();
      params.append("propertyId", property.id.toString());
      const {
        data: { data: reviews },
      } = await http.get(`/reviews`, {
        params,
      });

      const numberOfReviews = reviews.length;
      const rating =
        reviews.reduce(
          (acc: number, review: Review) => acc + calculateAvgRating(review),
          0
        ) / numberOfReviews || 0;

      return {
        ...property,
        reviews: {
          rating,
          numberOfReviews,
        },
      };
    }
  );

  const propertiesWithReviews = await Promise.all(
    propertiesWithReviewsPromises
  );

  return propertiesWithReviews;
}
