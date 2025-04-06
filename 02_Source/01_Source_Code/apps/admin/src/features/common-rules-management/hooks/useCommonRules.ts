import { parseAsInteger, useQueryState } from 'nuqs';
import useSWR, { preload } from 'swr';

import { axiosClient } from '../../../lib/axios-client';

type CommonRule = {
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

const fetcher = (url: string) =>
  axiosClient.get(url).then(({ data: axiosData }) => ({
    commonRules: axiosData.data as CommonRule[],
    pagination: axiosData.metadata.pagination as Pagination,
  }));

const fetchKey = ({ page }: { page: number }) =>
  `/rules?page=${page}&pageSize=5&type=common`;

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

  const commonRules = data?.commonRules || [];
  const pagination = data?.pagination || {
    page: 0,
    pageSize: 0,
    totalItems: 0,
    totalPages: 0,
  };
  const revalidateCommonRules = mutate;

  return {
    isLoading,
    error,
    commonRules,
    pagination,
    revalidateCommonRules,
  };
}
