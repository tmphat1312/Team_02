import { Breadcrumb } from '../components/layout/Breadcrumb';
import { PageContent } from '../components/layout/PageContent';

export default function Properties() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Properties', to: '/properties' }]} />
      <PageContent label="Properties">Properties</PageContent>
    </>
  );
}
