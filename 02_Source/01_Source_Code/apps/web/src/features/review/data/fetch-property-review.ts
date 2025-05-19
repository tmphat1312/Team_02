import { http } from "@/lib/http";
import { Review } from "@/typings/models";

export async function fetchPropertyReview({
  propertyId,
}: {
  propertyId: number;
}): Promise<Review[]> {
  const { data: httpData } = await http.get(
    `/reviews?propertyId=${propertyId}`
  );
  return httpData.data;
}
