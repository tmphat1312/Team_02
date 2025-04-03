import { parseAsInteger, useQueryState } from 'nuqs';
import useSWR, { preload } from 'swr';

import { axiosClient } from '../../../lib/axios-client';

type Category = {
  id: number;
  name: string;
  description: string;
};

type Pagination = {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};

const fetcher = async (key: string) => {
  const searchParams = new URLSearchParams(key.split('?')[1]);
  const page = parseInt(searchParams.get('page') || '1');
  const pageSize = 5;

  return axiosClient
    .get('/rules/common', {
      params: {
        page,
        pageSize,
      },
    })
    .then(({ data: axiosData }) => ({
      commonRules: axiosData.data as Category[],
      pagination: axiosData.metadata.pagination as Pagination,
    }));
};

const fetchKey = ({ page }: { page: number }) => `/rules?page=${page}`;

export function useCommonRules() {
  const [page] = useQueryState('page', parseAsInteger.withDefault(1));
  const { isLoading, error, data, mutate } = useSWR(
    fetchKey({ page }),
    fetcher
  );

  if (data) {
    if (page - 1 > 0) {
      preload(fetchKey({ page: page - 1 }), fetcher);
    }

    if (page + 1 <= data.pagination.totalPages) {
      preload(fetchKey({ page: page + 1 }), fetcher);
    }
  }

  return {
    isLoading,
    error,
    commonRules: data?.commonRules || [],
    pagination: data?.pagination || {
      page: 0,
      pageSize: 0,
      totalItems: 0,
      totalPages: 0,
    },
    revalidateCommonRules: mutate,
  };
}
