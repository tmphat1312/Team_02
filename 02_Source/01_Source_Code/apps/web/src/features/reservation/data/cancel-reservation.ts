import { http } from "@/lib/http";

export async function cancelReservation(reservationId: number) {
  return http.post(`/reservations/${reservationId}/cancel`);
}
