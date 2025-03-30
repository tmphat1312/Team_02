import {
  Alert,
  Image,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@heroui/react';
import { parseAsInteger, useQueryState } from 'nuqs';

import { useCategories } from '../hooks/useCategories';
import { DeleteCategoryButton } from './DeleteCategoryButton';

export function CategoryTable() {
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
  const {
    isLoading,
    error,
    categories,
    pagination: { limit: pageSize, totalItems, totalPages },
  } = useCategories();

  if (isLoading) {
    return <TableSkeleton />;
  }

  if (error) {
    return <Alert color="danger">{error.message}</Alert>;
  }

  return (
    <Table
      aria-label="Example static collection table"
      selectionMode="multiple"
      bottomContent={
        <div className="my-2 flex w-full items-center justify-center gap-4">
          <Pagination
            isCompact
            showControls
            showShadow
            page={page}
            total={totalPages}
            onChange={(page) => setPage(page)}
          />
          <span className="text-sm text-gray-500">
            ({(page - 1) * pageSize + 1} -{' '}
            {Math.min(page * pageSize, totalItems)} of {totalItems})
          </span>
        </div>
      }
    >
      <TableHeader>
        <TableColumn key="id">ID</TableColumn>
        <TableColumn key="image">IMAGE</TableColumn>
        <TableColumn key="name">NAME</TableColumn>
        <TableColumn key="description">DESCRIPTION</TableColumn>
        <TableColumn key="actions">ACTIONS</TableColumn>
      </TableHeader>
      <TableBody
        items={
          categories as {
            id: string;
            name: string;
            description: string;
          }[]
        }
        isLoading={isLoading}
      >
        {(item) => (
          <TableRow key={item.id}>
            <TableCell>{item.id}</TableCell>
            <TableCell>
              <Image
                alt="HeroUI hero Image with delay"
                src="https://app.requestly.io/delay/1000/https://heroui.com/images/hero-card-complete.jpeg"
                height={60}
                width={60}
                className="size-[60px] object-cover"
              />
            </TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.description}</TableCell>
            <TableCell>
              <DeleteCategoryButton />
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export function TableSkeleton() {
  return (
    <div
      className="animate-pulse space-y-4 p-4"
      aria-label="Loading Table"
      aria-hidden
    >
      {/* Table Header Skeleton */}
      <div className="h-10 rounded bg-gray-100"></div>

      {/* Table Rows Skeleton */}
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="h-6 rounded bg-gray-100"></div>
        ))}
      </div>

      {/* Paginator Skeleton */}
      <div className="mt-4 h-10 rounded bg-gray-100"></div>
    </div>
  );
}
