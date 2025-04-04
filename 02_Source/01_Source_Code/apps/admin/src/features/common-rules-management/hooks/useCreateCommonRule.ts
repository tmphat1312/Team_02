import axios from 'axios';
import useSWRMutation from 'swr/mutation';
import { axiosClient } from '../../../lib/axios-client';

export type CreateCommonRuleData = {
  name: string;
  description: string;
};

async function createCommonRule(
  url: string,
  { arg }: { arg: CreateCommonRuleData }
) {
  try {
    const response = await axiosClient.post(url, {
      name: arg.name,
      description: arg.description,
      type: 'common',
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.error.message);
    }
    throw new Error('An unknown error occurred');
  }
}

export function useCreateCommonRule() {
  const { trigger, isMutating } = useSWRMutation('/rules', createCommonRule);

  return {
    isPending: isMutating,
    createCommonRule: trigger,
  };
}
