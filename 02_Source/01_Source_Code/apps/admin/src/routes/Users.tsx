import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

import { Breadcrumb } from '../components/layout/Breadcrumb';
import { PageContent } from '../components/layout/PageContent';

const users = [
  {
    code: '001',
    name: 'Product 1',
    category: 'Category 1',
    quantity: 10,
  },
  {
    code: '002',
    name: 'Product 2',
    category: 'Category 2',
    quantity: 20,
  },
  {
    code: '003',
    name: 'Product 3',
    category: 'Category 3',
    quantity: 30,
  },
  {
    code: '004',
    name: 'Product 4',
    category: 'Category 4',
    quantity: 40,
  },
  {
    code: '005',
    name: 'Product 5',
    category: 'Category 5',
    quantity: 50,
  },
];

export function Users() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Users', to: '/users' }]} />
      <PageContent
        label="Users"
        PageActionComponent={
          <Button
            icon="pi pi-user-plus"
            label="Create new"
            size="small"
            outlined
          />
        }
      >
        <div className="overflow-clip rounded-2xl shadow">
          <DataTable
            value={users}
            tableStyle={{ minWidth: '50rem' }}
            stripedRows
            showGridlines
          >
            <Column field="code" header="Code"></Column>
            <Column field="name" header="Name"></Column>
            <Column field="category" header="Category"></Column>
            <Column field="quantity" header="Quantity"></Column>
          </DataTable>
        </div>
      </PageContent>
    </>
  );
}
