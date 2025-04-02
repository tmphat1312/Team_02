import axios from 'axios';
import useSWRMutation from 'swr/mutation';
import { axiosClient } from '../../../lib/axios-client';

export type DeleteAmenityData = {
  id: number;
};

async function deleteAmenity(url: string, { arg }: { arg: DeleteAmenityData }) {
  try {
    axiosClient.delete(`${url}/${arg.id}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.error.message);
    }
    throw new Error('An unknown error occurred');
  }
}

export function useDeleteAmenity() {
  const { trigger, isMutating } = useSWRMutation('/amenities', deleteAmenity);

  return {
    isPending: isMutating,
    deleteAmenity: trigger,
  };
}
