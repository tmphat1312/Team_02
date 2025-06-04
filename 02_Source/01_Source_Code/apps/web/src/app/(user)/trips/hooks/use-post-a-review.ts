import { postAReview } from "@/features/review/data/post-a-review";
import { getQueryClient } from "@/lib/tanstack-query";
import { useMutation } from "@tanstack/react-query";

export function usePostAReview() {
  const queryClient = getQueryClient();
  const mutation = useMutation({
    mutationFn: postAReview,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tenant-reservations"],
      });
      queryClient.invalidateQueries({
        queryKey: ["host-reservations"],
      });
      queryClient.invalidateQueries({
        queryKey: ["reviews"],
      });
    },
  });
  return mutation;
}
