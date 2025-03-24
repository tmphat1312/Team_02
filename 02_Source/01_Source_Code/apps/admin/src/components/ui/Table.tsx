import { parseAsInteger, useQueryState } from 'nuqs';
import { Column } from 'primereact/column';
import {
  DataTable,
  DataTablePageEvent,
  DataTableValue,
} from 'primereact/datatable';
import { Paginator } from 'primereact/paginator';

export const DEFAULT_ROWS = 10;

export type TableProps = {
  isLoading?: boolean;
  rows?: number;
  data: DataTableValue[];
  totalRecords: number;
};

export function Table({
  isLoading = false,
  rows = DEFAULT_ROWS,
  data,
  totalRecords,
}: TableProps) {
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));

  const onPage = (event: DataTablePageEvent) => {
    setPage(event.page! + 1);
  };

  return (
    <div className="overflow-clip rounded-xl border border-gray-200 bg-white shadow">
      <DataTable
        dataKey="id"
        loading={isLoading}
        value={data}
        size="small"
        emptyMessage="No data found"
        lazy
        showGridlines
        stripedRows
      >
        <Column field="name" header="Name"></Column>
        <Column field="description" header="Description"></Column>
      </DataTable>
      <Paginator
        rows={rows}
        first={(page - 1) * rows}
        totalRecords={totalRecords}
        onPageChange={onPage}
      />
    </div>
  );
}
