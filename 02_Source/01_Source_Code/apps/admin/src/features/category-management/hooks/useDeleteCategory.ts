import axios from 'axios';
import useSWRMutation from 'swr/mutation';
import { axiosClient } from '../../../lib/axios-client';

export type DeleteCategoryData = {
  id: number;
};

async function deleteCategory(
  url: string,
  { arg }: { arg: DeleteCategoryData }
) {
  try {
    axiosClient.delete(`${url}/${arg.id}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.error.message);
    }
    throw new Error('An unknown error occurred');
  }
}

export function useDeleteCategory() {
  const { trigger, isMutating } = useSWRMutation('/categories', deleteCategory);

  return {
    isPending: isMutating,
    deleteCategory: trigger,
  };
}
