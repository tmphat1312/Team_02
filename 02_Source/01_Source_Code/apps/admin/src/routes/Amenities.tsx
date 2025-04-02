import { Breadcrumb } from '../components/Breadcrumb';
import { PageContent } from '../components/PageContent';
import { AmenityTable } from '../features/amenity-management/components/AmenityTable';
import { CreateAmenityButton } from '../features/amenity-management/components/CreateAmenityButton';

export default function Amenities() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Amenities', to: '/amenities' }]} />
      <PageContent
        label="Amenity Management"
        PageActionComponent={<CreateAmenityButton />}
      >
        <AmenityTable />
      </PageContent>
    </>
  );
}
