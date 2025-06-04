import { refundReservation } from "@/features/reservation/data/refund-reservation";
import { getQueryClient } from "@/lib/tanstack-query";
import { useMutation } from "@tanstack/react-query";

export function useRefundReservation(reservationId: number) {
  const queryClient = getQueryClient();
  const mutation = useMutation({
    mutationFn: () => refundReservation(reservationId),
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
