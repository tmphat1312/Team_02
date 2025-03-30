import { Breadcrumb } from '../components/Breadcrumb';
import { PageContent } from '../components/PageContent';

export default function Amenities() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Amenities', to: '/amenities' }]} />
      <PageContent label="Amenity Management">Hello from amenities</PageContent>
    </>
  );
}
