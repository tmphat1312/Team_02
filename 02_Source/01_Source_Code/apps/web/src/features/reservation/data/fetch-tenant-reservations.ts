import { fetchPropertyDetails } from "@/features/listing/data/fetch-property-details";
import { fetchPropertyHost } from "@/features/listing/data/fetch-property-host";
import { fetchTenantReviewOnProperty } from "@/features/review/data/fetch-tenant-review-on-property";
import { http } from "@/lib/http";
import { Reservation, Trip } from "@/typings/models";

export async function fetchTenantReservations(
  tenantId: string
): Promise<Trip[]> {
  const { data: httpData } = await http.get(
    `/reservations?tenantId=${tenantId}`
  );
  const reservations = httpData.data as Reservation[];
  const reservationWithPropertyPromises = reservations.map(async (r) => {
    const [property, review] = await Promise.all([
      fetchPropertyDetails(r.propertyId),
      fetchTenantReviewOnProperty({
        tenantId,
        propertyId: r.propertyId,
      }),
    ]);
    const host = await fetchPropertyHost(property.hostId);
    return {
      ...r,
      property: {
        ...property,
        host,
      },
      review,
    };
  });
  const reservationWithProperty = await Promise.all(
    reservationWithPropertyPromises
  );

  return reservationWithProperty;
}
