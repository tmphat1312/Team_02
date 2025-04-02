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
            align={column.key === 'actions' ? 'end' : 'center'}
          >
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={amenities} emptyContent={'No rows to display.'}>
        {(item) => (
          <TableRow key={item.id}>
            <TableCell>{item.id}</TableCell>
            <TableCell>
              <div className="flex justify-center">
                <Image
                  alt={item.name}
                  src={item.imagePath}
                  height={60}
                  width={60}
                  className="size-[60px] object-cover"
                />
              </div>
            </TableCell>
            <TableCell width={240}>{item.name}</TableCell>
            <TableCell width={360}>{item.description}</TableCell>
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
