import { confirmReservation } from "@/features/reservation/data/confirm-reservation";
import { getQueryClient } from "@/lib/tanstack-query";
import { useMutation } from "@tanstack/react-query";

export function useConfirmReservation(reservationId: number) {
  const queryClient = getQueryClient();
  const mutation = useMutation({
    mutationFn: () => confirmReservation(reservationId),
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
