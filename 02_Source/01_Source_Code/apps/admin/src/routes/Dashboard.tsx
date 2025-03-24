import { Breadcrumb } from '../components/layout/Breadcrumb';
import { PageContent } from '../components/layout/PageContent';

export default function Dashboard() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Dashboard', to: '/dashboard' }]} />
      <PageContent label="Dashboard">Dashboard content</PageContent>
    </>
  );
}
