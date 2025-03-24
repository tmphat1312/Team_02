import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable, DataTablePageEvent } from 'primereact/datatable';

import { Breadcrumb } from '../components/layout/Breadcrumb';
import { PageContent } from '../components/layout/PageContent';
import useSWR from 'swr';
import { useState } from 'react';

const fetcher = (url: string) =>
  fetch(url)
    .then((r) => r.json())
    .then((r) => ({
      categories: r.data,
      pagination: r.metadata.pagination,
    }));

type LazyTableState = {
  first: number;
  rows: number;
  page: number;
};

export default function Categories() {
  const [lazyState, setLazyState] = useState<LazyTableState>({
    first: 0,
    rows: 10,
    page: 1,
  });
  const { isLoading, error, data } = useSWR(
    `http://localhost:3001/categories?page=${lazyState.page + 1}`,
    fetcher
  );

  if (error) return <div>Error loading data</div>;

  const onPage = (event: DataTablePageEvent) => {
    setLazyState({
      first: event.first,
      page: event.page || 0,
      rows: event.rows,
    });
  };

  return (
    <>
      <Breadcrumb items={[{ label: 'Categories', to: '/categories' }]} />
      <PageContent
        label="Categories"
        PageActionComponent={
          <Button icon="pi pi-plus" label="Create new" size="small" outlined />
        }
      >
        <div className="overflow-clip rounded-xl border border-gray-200 bg-white p-8 shadow">
          <DataTable
            value={data?.categories}
            paginator
            rows={lazyState.rows}
            totalRecords={data?.pagination.totalItems}
            size="small"
            showGridlines
            stripedRows
            loading={isLoading}
            dataKey="id"
            lazy
            first={lazyState.first}
            onPage={onPage}
          >
            <Column field="name" header="Name"></Column>
            <Column field="description" header="Description"></Column>
          </DataTable>
        </div>
      </PageContent>
    </>
  );
}
