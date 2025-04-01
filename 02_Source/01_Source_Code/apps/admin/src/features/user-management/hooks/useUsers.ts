import useSWR from 'swr';
import { authClient } from '../../../lib/auth-client';

const fetcher = async () => {
  const { data, error } = await authClient.admin.listUsers({
    query: {
      limit: 10,
    },
  });

  if (error) {
    throw error;
  }

  if (!data) {
    throw new Error('No data found');
  }

  // @ts-expect-error Better Auth type
  const { users, total, limit } = data;
  return {
    users,
    pagination: {
      totalItems: total,
      pageSize: limit,
    },
  };
};

export function useUsers() {
  const { isLoading, error, data } = useSWR('/users', fetcher);
  const users = data?.users ?? [];
  const pagination = data?.pagination ?? { totalItems: 0, pageSize: 0 };

  return {
    isLoading,
    error,
    users,
    pagination,
  };
}
