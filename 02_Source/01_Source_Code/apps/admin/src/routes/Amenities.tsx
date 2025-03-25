import { Button } from 'primereact/button';

import { Breadcrumb } from '../components/layout/Breadcrumb';
import { PageContent } from '../components/layout/PageContent';

export default function Amenities() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Amenities', to: '/amenities' }]} />
      <PageContent
        label="Amenity Management"
        PageActionComponent={
          <Button icon="pi pi-plus" label="Create new" size="small" outlined />
        }
      >
        Hello from amenities
      </PageContent>
    </>
  );
}
