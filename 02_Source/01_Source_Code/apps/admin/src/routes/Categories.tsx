import { Button } from 'primereact/button';

import { Breadcrumb } from '../components/layout/Breadcrumb';
import { PageContent } from '../components/layout/PageContent';
import { CategoryTable } from '../features/categories/components/CategoryTable';

export default function Categories() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Categories', to: '/categories' }]} />
      <PageContent
        label="Categories"
        PageActionComponent={
          <Button icon="pi pi-plus" label="Create new" size="small" outlined />
        }
      >
        <CategoryTable />
      </PageContent>
    </>
  );
}
