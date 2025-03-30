import { Breadcrumb } from '../components/Breadcrumb';
import { PageContent } from '../components/PageContent';

export default function Users() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Users', to: '/users' }]} />
      <PageContent label="User Management">Users</PageContent>
    </>
  );
}
