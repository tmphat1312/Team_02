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
import { useCategories } from '../hooks/useCategories';
import { DeleteCategoryButton } from './DeleteCategoryButton';

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

  if (error) {
    return <Alert color="danger">{error.message}</Alert>;
  }

  if (isLoading) {
    return <TableSkeleton />;
  }

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
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody
        items={categories}
        isLoading={isLoading}
        emptyContent={'No rows to display.'}
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
