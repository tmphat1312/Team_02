import { payReservation } from "@/features/reservation/data/pay-reservation";
import { getQueryClient } from "@/lib/tanstack-query";
import { useMutation } from "@tanstack/react-query";

export function usePayReservation(reservationId: number) {
  const queryClient = getQueryClient();
  const mutation = useMutation({
    mutationFn: () => payReservation(reservationId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["host-reservations"],
      });
      queryClient.invalidateQueries({
        queryKey: ["tenant-reservations"],
      });
    },
  });
  return mutation;
}
