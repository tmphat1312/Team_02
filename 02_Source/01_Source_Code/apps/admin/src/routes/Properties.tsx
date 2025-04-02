import { Breadcrumb } from '../components/Breadcrumb';
import { PageContent } from '../components/PageContent';
import { PropertyTable } from '../features/property-management/components/PropertyTable';

export default function Properties() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Properties', to: '/properties' }]} />
      <PageContent label="Properties">
        <PropertyTable />
      </PageContent>
    </>
  );
}
