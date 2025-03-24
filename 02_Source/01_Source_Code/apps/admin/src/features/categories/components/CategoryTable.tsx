import { Table } from '../../../components/ui/Table';
import { useCategories } from '../hooks/useCategories';

export function CategoryTable() {
  const { isLoading, error, categories, pagination } = useCategories();

  if (error) return <div>Error loading data</div>;

  return (
    <Table
      isLoading={isLoading}
      data={categories}
      totalRecords={pagination.totalItems}
    />
  );
}
