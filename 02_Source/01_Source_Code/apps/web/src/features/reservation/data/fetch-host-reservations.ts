import { fetchUserDetails } from "@/features/auth/data/fetch-user-details";
import { fetchPropertyDetails } from "@/features/listing/data/fetch-property-details";
import { fetchTenantReviewOnProperty } from "@/features/review/data/fetch-tenant-review-on-property";
import { http } from "@/lib/http";
import { ManagedReservation, Reservation } from "@/typings/models";

export async function fetchHostReservations(
  hostId: string
): Promise<ManagedReservation[]> {
  const { data: httpData } = await http.get(`/reservations?hostId=${hostId}`);
  const reservations = httpData.data as Reservation[];
  const reservationWithPropertyPromises = reservations.map(async (r) => {
    const [property, review, tenant] = await Promise.all([
      fetchPropertyDetails(r.propertyId),
      fetchTenantReviewOnProperty({
        tenantId: r.tenantId,
        propertyId: r.propertyId,
      }),
      fetchUserDetails(r.tenantId),
    ]);
    return {
      ...r,
      property,
      tenant,
      review,
    };
  });
  const reservationWithProperty = await Promise.all(
    reservationWithPropertyPromises
  );

  return reservationWithProperty;
}
