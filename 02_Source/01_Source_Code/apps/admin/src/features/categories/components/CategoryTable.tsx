import { Message } from 'primereact/message';
import { Column } from '../../../components/ui/Column';
import { Table } from '../../../components/ui/Table';
import { useCategories } from '../hooks/useCategories';

export function CategoryTable() {
  const { isLoading, error, categories, pagination } = useCategories();

  if (error) {
    return <Message severity="error" text={'Error fetching categories'} />;
  }

  return (
    <Table
      isLoading={isLoading}
      data={categories}
      totalRecords={pagination.totalItems}
    >
      <Column field="id" header="ID" style={{ width: '5%' }} />
      <Column field="name" header="Name" style={{ width: '20%' }} />
      <Column field="description" header="Description" />
    </Table>
  );
}
