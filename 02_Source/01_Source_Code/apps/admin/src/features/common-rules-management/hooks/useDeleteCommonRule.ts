import axios from 'axios';
import useSWRMutation from 'swr/mutation';
import { axiosClient } from '../../../lib/axios-client';

export type DeleteCommonRuleData = {
  id: number;
};

async function deleteCommonRule(
  url: string,
  { arg }: { arg: DeleteCommonRuleData }
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

export function useDeleteCommonRule() {
  const { trigger, isMutating } = useSWRMutation('/rules', deleteCommonRule);

  return {
    isPending: isMutating,
    deleteCommonRule: trigger,
  };
}
