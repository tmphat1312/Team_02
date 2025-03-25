import { parseAsInteger, useQueryState } from 'nuqs';
import {
  DataTable,
  DataTablePageEvent,
  DataTableValue,
} from 'primereact/datatable';
import { Paginator } from 'primereact/paginator';
import React from 'react';

export const DEFAULT_ROWS = 10;

export type TableProps = {
  isLoading?: boolean;
  rows?: number;
  data: DataTableValue[];
  totalRecords: number;
  children?: React.ReactNode;
};

export function Table({
  isLoading = false,
  rows = DEFAULT_ROWS,
  data,
  totalRecords,
  children,
}: TableProps) {
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));

  const onPage = (event: DataTablePageEvent) => {
    setPage(event.page! + 1);
  };

  return (
    <div className="overflow-clip rounded-xl border border-gray-200 bg-white shadow">
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <DataTable
          style={{ fontSize: '0.875rem' }}
          dataKey="id"
          loading={isLoading}
          value={data}
          size="small"
          emptyMessage="No data found"
          lazy
          showGridlines
          stripedRows
        >
          {children ? children : <div>No row template provided</div>}
        </DataTable>
      )}
      <Paginator
        className="[&_button]:h-[2.25rem]! [&_button]:min-w-[2.25rem]!"
        rows={rows}
        first={(page - 1) * rows}
        totalRecords={totalRecords}
        onPageChange={onPage}
        template={{
          layout:
            'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport',
        }}
      />
    </div>
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
