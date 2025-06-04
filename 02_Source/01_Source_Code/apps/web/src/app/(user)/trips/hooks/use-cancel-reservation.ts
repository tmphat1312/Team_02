import { cancelReservation } from "@/features/reservation/data/cancel-reservation";
import { getQueryClient } from "@/lib/tanstack-query";
import { useMutation } from "@tanstack/react-query";

export function useCancelReservation(reservationId: number) {
  const queryClient = getQueryClient();
  const mutation = useMutation({
    mutationFn: () => cancelReservation(reservationId),
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
