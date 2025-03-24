import { Breadcrumb } from '../components/layout/Breadcrumb';
import { PageContent } from '../components/layout/PageContent';

export default function Amenities() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Amentties', to: '/amenities' }]} />
      <PageContent label="Amenities">Hello from amenities</PageContent>
    </>
  );
}
