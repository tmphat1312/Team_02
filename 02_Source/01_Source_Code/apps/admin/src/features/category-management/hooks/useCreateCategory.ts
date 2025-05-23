import axios from 'axios';
import useSWRMutation from 'swr/mutation';
import { axiosClient } from '../../../lib/axios-client';

export type CreateCategoryData = {
  name: string;
  description: string;
  image: File;
};

async function createCategory(
  url: string,
  { arg }: { arg: CreateCategoryData }
) {
  const formData = new FormData();
  formData.append('name', arg.name);
  formData.append('description', arg.description);
  formData.append('image', arg.image);

  try {
    const response = await axiosClient.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.error.message);
    }
    throw new Error('An unknown error occurred');
  }
}

export function useCreateCategory() {
  const { trigger, isMutating } = useSWRMutation('/categories', createCategory);

  return {
    isPending: isMutating,
    createCategory: trigger,
  };
}
