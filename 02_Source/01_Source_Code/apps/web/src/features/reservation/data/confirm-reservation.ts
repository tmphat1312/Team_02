import { http } from "@/lib/http";

export async function confirmReservation(reservationId: number) {
  return http.post(`/reservations/${reservationId}/confirm`);
}
