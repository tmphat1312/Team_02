import { Breadcrumb } from '../components/Breadcrumb';
import { PageContent } from '../components/PageContent';
import { CreateUserButton } from '../features/user-management/components/CreateUserButton';
import { UserTable } from '../features/user-management/components/UserTable';

export default function Users() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Users', to: '/users' }]} />
      <PageContent
        label="User Management"
        PageActionComponent={<CreateUserButton />}
      >
        <UserTable />
      </PageContent>
    </>
  );
}
