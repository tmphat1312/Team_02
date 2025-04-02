import { Breadcrumb } from '../components/Breadcrumb';
import { PageContent } from '../components/PageContent';

export default function Dashboard() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Dashboard', to: '/dashboard' }]} />
      <PageContent label="Dashboard">Dashboard content</PageContent>
    </>
  );
}
