import { http } from "@/lib/http";

type Args = {
  reservationId: number;
  tenantId: string;
  propertyId: number;
  cleanliness: number;
  communication: number;
  accuracy: number;
  location: number;
  content: string;
};

export async function postAReview({
  reservationId,
  tenantId,
  propertyId,
  cleanliness,
  communication,
  accuracy,
  location,
  content,
}: Args) {
  return http.post("/reviews", {
    reservationId,
    tenantId,
    propertyId,
    cleanliness,
    communication,
    accuracy,
    location,
    content,
  });
}
