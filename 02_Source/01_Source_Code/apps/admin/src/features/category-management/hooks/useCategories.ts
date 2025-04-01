import { parseAsInteger, useQueryState } from 'nuqs';
import useSWR, { preload } from 'swr';

import { axiosClient } from '../../../lib/axios-client';

const getCategoriesQuery = `
  query GetCategories($page: Number!, $pageSize: Number!) {
    categories(pagination: { page: $page, pageSize: $pageSize }) {
      data {
        id
        name
        description
        imagePath
      }
      metadata {
        pagination {
          page
          pageSize
          totalItems
          totalPages
        }
      }
    }
  }
`;

type Category = {
  id: string;
  name: string;
  description: string;
  imagePath: string;
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
    .post('/graphql', {
      query: getCategoriesQuery,
      variables: {
        page,
        pageSize,
      },
    })
    .then(({ data: axiosData }) => ({
      categories: axiosData.data.categories.data as Category[],
      pagination: axiosData.data.categories.metadata.pagination as Pagination,
    }));
};

const fetchKey = ({ page }: { page: number }) => `/categories?page=${page}`;

export function useCategories() {
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
    categories: data?.categories || [],
    pagination: data?.pagination || {
      page: 0,
      pageSize: 0,
      totalItems: 0,
      totalPages: 0,
    },
    revalidateCategories: mutate,
  };
}
