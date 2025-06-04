import { http } from "@/lib/http";

export async function payReservation(reservationId: number) {
  return http.post(`/reservations/${reservationId}/pay`);
}
