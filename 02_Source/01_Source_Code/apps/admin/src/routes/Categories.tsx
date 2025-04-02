import { Breadcrumb } from '../components/Breadcrumb';
import { PageContent } from '../components/PageContent';
import { CategoryTable } from '../features/category-management/components/CategoryTable';
import { CreateCategoryButton } from '../features/category-management/components/CreateCategoryButton';

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
