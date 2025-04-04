import {
  Alert,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@heroui/react';

import { Pagination } from '../../../components/Pagination';
import { TableSkeleton } from '../../../components/TableSkeleton';
import { DeleteCommonRuleButton } from './DeleteCommonRuleButton';

import { useCommonRules } from '../hooks/useCommonRules';

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'NAME' },
  { key: 'description', label: 'DESCRIPTION' },
  { key: 'actions', label: 'ACTIONS' },
];

export function CommonRulesTable() {
  const {
    error,
    isLoading,
    commonRules,
    pagination: { pageSize, totalItems, totalPages },
  } = useCommonRules();

  if (error) return <Alert color="danger">{error.message}</Alert>;

  if (isLoading) return <TableSkeleton />;

  return (
    <Table
      aria-label="CommonRule Table"
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
      <TableBody items={commonRules} emptyContent={'No rows to display.'}>
        {(item) => (
          <TableRow key={item.id}>
            <TableCell width={80}>{item.id}</TableCell>
            <TableCell width={360}>{item.name}</TableCell>
            <TableCell>{item.description}</TableCell>
            <TableCell width={40}>
              <DeleteCommonRuleButton
                commonRuleId={item.id}
                commonRuleName={item.name}
              />
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
