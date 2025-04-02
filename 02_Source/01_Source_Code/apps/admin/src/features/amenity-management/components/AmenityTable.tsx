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
import { DeleteAmenityButton } from './DeleteAmenityButton';

import { useAmenities } from '../hooks/useAmenities';

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'image', label: 'IMAGE' },
  { key: 'name', label: 'NAME' },
  { key: 'description', label: 'DESCRIPTION' },
  { key: 'actions', label: 'ACTIONS' },
];

export function AmenityTable() {
  const {
    error,
    isLoading,
    amenities,
    pagination: { pageSize, totalItems, totalPages },
  } = useAmenities();

  if (error) return <Alert color="danger">{error.message}</Alert>;

  if (isLoading) return <TableSkeleton />;

  return (
    <Table
      aria-label="Amenity Table"
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
      <TableBody items={amenities} emptyContent={'No rows to display.'}>
        {(item) => (
          <TableRow key={item.id}>
            <TableCell width={60}>{item.id}</TableCell>
            <TableCell width={100}>
              <Image
                alt={item.name}
                src={item.imageUrl}
                height={40}
                width={40}
                className="size-[40px] object-cover"
              />
            </TableCell>
            <TableCell width={280}>{item.name}</TableCell>
            <TableCell>{item.description}</TableCell>
            <TableCell width={40}>
              <DeleteAmenityButton
                amenityId={item.id}
                amenityName={item.name}
              />
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
