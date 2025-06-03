import { http } from "@/lib/http";

export async function refundReservation(reservationId: number) {
  return http.post(`/reservations/${reservationId}/refund`);
}
