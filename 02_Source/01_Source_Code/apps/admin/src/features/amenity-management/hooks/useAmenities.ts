import { parseAsInteger, useQueryState } from 'nuqs';
import useSWR, { preload } from 'swr';
import { axiosClient } from '../../../lib/axios-client';

const getAmenitiesQuery = `
  query GetAmenities($page: Number!, $pageSize: Number!) {
    amenities(pagination: { page: $page, pageSize: $pageSize }) {
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
  id: number;
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
      query: getAmenitiesQuery,
      variables: {
        page,
        pageSize,
      },
    })
    .then(({ data: axiosData }) => ({
      amenities: axiosData.data.amenities.data as Category[],
      pagination: axiosData.data.amenities.metadata.pagination as Pagination,
    }));
};

const fetchKey = ({ page }: { page: number }) => `/amenities?page=${page}`;

export function useAmenities() {
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
    amenities: data?.amenities || [],
    pagination: data?.pagination || {
      page: 0,
      pageSize: 0,
      totalItems: 0,
      totalPages: 0,
    },
    revalidateAmenities: mutate,
  };
}
