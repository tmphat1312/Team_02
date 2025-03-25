import { Breadcrumb } from '../components/layout/Breadcrumb';
import { PageContent } from '../components/layout/PageContent';
import { CategoryTable } from '../features/categories/components/CategoryTable';
import { CreateCategoryButton } from '../features/categories/components/CreateCategoryButton';

export default function Categories() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Categories', to: '/categories' }]} />
      <PageContent
        label="Category Management"
        PageActionComponent={<CreateCategoryButton />}
      >
        <CategoryTable />
      </PageContent>
    </>
  );
}
