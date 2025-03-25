import { Breadcrumb } from '../components/layout/Breadcrumb';
import { PageContent } from '../components/layout/PageContent';

export default function Users() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Users', to: '/users' }]} />
      <PageContent label="User Management">Users</PageContent>
    </>
  );
}
