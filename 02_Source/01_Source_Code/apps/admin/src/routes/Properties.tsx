import { Breadcrumb } from '../components/Breadcrumb';
import { PageContent } from '../components/PageContent';

export default function Properties() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Properties', to: '/properties' }]} />
      <PageContent label="Properties">Properties</PageContent>
    </>
  );
}
