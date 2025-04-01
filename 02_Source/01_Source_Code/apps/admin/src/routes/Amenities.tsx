import { Breadcrumb } from '../components/Breadcrumb';
import { PageContent } from '../components/PageContent';
import { AmenityTable } from '../features/amenity-management/components/AmenityTable';

export default function Amenities() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Amenities', to: '/amenities' }]} />
      <PageContent label="Amenity Management">
        <AmenityTable />
      </PageContent>
    </>
  );
}
