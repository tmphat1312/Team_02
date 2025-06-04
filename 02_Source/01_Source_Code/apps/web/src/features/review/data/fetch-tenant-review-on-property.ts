import { http } from "@/lib/http";
import { Review } from "@/typings/models";

export async function fetchTenantReviewOnProperty({
  tenantId,
  propertyId,
}: {
  tenantId: string;
  propertyId: number;
}): Promise<Review | null> {
  const { data: httpData } = await http.get(
    `/reviews?tenantId=${tenantId}&propertyId=${propertyId}`
  );
  const review = httpData.data.at(0) || null;
  return review;
}
