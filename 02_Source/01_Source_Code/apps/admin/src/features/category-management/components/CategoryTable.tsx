import {
  Alert,
  Image,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@heroui/react';

import { Pagination } from '../../../components/Pagination';
import { TableSkeleton } from '../../../components/TableSkeleton';
import { DeleteCategoryButton } from './DeleteCategoryButton';

import { useCategories } from '../hooks/useCategories';

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'image', label: 'IMAGE' },
  { key: 'name', label: 'NAME' },
  { key: 'description', label: 'DESCRIPTION' },
  { key: 'actions', label: 'ACTIONS' },
];

export function CategoryTable() {
  const {
    error,
    isLoading,
    categories,
    pagination: { pageSize, totalItems, totalPages },
  } = useCategories();

  if (error) return <Alert color="danger">{error.message}</Alert>;

  if (isLoading) return <TableSkeleton />;

  return (
    <Table
      aria-label="Category Table"
      bottomContent={
        <Pagination
          totalPages={totalPages}
          pageSize={pageSize}
          totalItems={totalItems}
        />
      }
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.key}
            align={column.key === 'actions' ? 'end' : 'start'}
          >
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={categories} emptyContent={'No rows to display.'}>
        {(item) => (
          <TableRow key={item.id}>
            <TableCell width={80}>{item.id}</TableCell>
            <TableCell width={100}>
              <Image
                alt={item.name}
                src={item.imageUrl}
                height={40}
                width={40}
                className="size-[40px] object-cover"
              />
            </TableCell>
            <TableCell width={260}>{item.name}</TableCell>
            <TableCell>{item.description}</TableCell>
            <TableCell width={40}>
              <DeleteCategoryButton
                categoryId={item.id}
                categoryName={item.name}
              />
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
